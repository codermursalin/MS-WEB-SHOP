import React, { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Message from '../components/Message';
import { addToCart,removeFromCart } from '../action/cartAction';
import { Col, ListGroup, Row,Image, FormControl,Button,Card } from 'react-bootstrap';
const CartPage = () => {
  const {id}=useParams();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [searchParams] = useSearchParams();
  let qty=searchParams.get('qty')?searchParams.get('qty'):1;
  qty=Number(qty);
  const {cartItems}=useSelector(state=>state.cart);
  useEffect(() => {
    dispatch(addToCart(id,qty));
  }, [id,qty,dispatch])
  
  const removeFromCartHandler=(id)=>{
    dispatch(removeFromCart(id))
  }
  const checkoutHandler=()=>{
    navigate('/login?redirect=/shipping')
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length===0?<Message>Your Cart is Empty <Link to='/'>Go Back</Link></Message>:(
          <ListGroup variant='flush'>
            {cartItems.map(item=>(<ListGroup.Item key={item.id}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid roundedCircle/>
                </Col>
                <Col md={3}>
                 <Link to={`/product/${item.id}`}>{item.name}</Link>
                </Col>
                <Col md={2}>
                ₹{item.price}
                </Col>
                <Col md={2}>
                <FormControl as='select'
                      value={item.qty} onChange={(e)=>dispatch(addToCart(item.id,Number(e.target.value)))}>
                       {
                          [...Array(item.countInStock).keys()].map(x=>(<option key={x+1} value={x+1}>{x+1}</option>))
                       }
                      </FormControl>
                </Col>
                <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
              </Row>
            </ListGroup.Item>))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              ₹
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartPage