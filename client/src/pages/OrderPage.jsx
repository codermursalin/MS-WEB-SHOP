import React, {useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  deliverOrder,
  getOrderDetails,
  payOrder
} from '../action/orderAction'

const OrderPage = () => {
    const {id}=useParams();
    const dispatch = useDispatch()
    const navigate=useNavigate();
    const { order, loading, error } = useSelector((state) => state.orderDetails)
    const { userInfo } = useSelector((state) => state.userLogin)
    const orderDeliver = useSelector((state) => state.orderDeliver)
    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver
    function loadScript(src) {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    }
    async function displayRazorpay() {
      const res = await loadScript(
        'https://checkout.razorpay.com/v1/checkout.js'
      );
  
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
      }
  
      const {data} = await axios.post('/api/orders/createorder',{amount:parseInt(order.totalPrice)});
      const { amount, id: order_id, currency } = data;
      const {data:API_KEY}=await axios.get('/api/orders/apikey');
  
      if (!data) {
        alert('Server error. Are you online?');
        return;
      }
      var options = {
        "key": API_KEY,
        "amount": amount.toString(),
        "currency": currency,
        "name": "MS WEB SHOP",
        "description": id,
        "image": "https://example.com/your_logo",
        "order_id": order_id,
        "handler": function (response){
            const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };
            dispatch(payOrder(id,data));
        },
        "prefill": {
            "name": "Mursalin Sk",
            "email": "mursalinsk@example.com",
            "contact": "9999999999"
        },
        "notes": {
            "address": "MS WEB SHOP"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response){
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
    });
    rzp1.open();
    }
  
    useEffect(() => {
      if(!userInfo){
        navigate('/login');
      }
      dispatch(getOrderDetails(id))
    }, [dispatch,userInfo,navigate,id,successPay,successDeliver])

  
    const deliverHandler=()=>{
      dispatch(dispatch(deliverOrder(order)));
    }
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}
                <p>
                <strong>OrderId: </strong>
                {order.paymentResult.orderId}
              </p>
              <p>
                <strong>PaymentId: </strong>
                {order.paymentResult.paymentId}
              </p>
                </Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>₹{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₹{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                    <Button variant="info" onClick={displayRazorpay}>pay</Button>
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      </>
  )
}

export default OrderPage