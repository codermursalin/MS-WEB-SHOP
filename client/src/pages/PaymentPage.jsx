import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../action/cartAction";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
const PaymentPage = () => {
    const { shippingAddress } = useSelector((state) => state.cart);
    const navigate=useNavigate();
  if (!shippingAddress.address) {
    navigate("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder");
  };
  return (
    <>
     <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Razorpay"
              id="Razorpay"
              name="paymentMethod"
              value="Razorpay"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </>
  )
}

export default PaymentPage