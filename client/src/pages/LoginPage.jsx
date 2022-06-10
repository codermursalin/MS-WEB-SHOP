import React, { useEffect, useState } from 'react'
import { Button,Form,Row,Col, Container } from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {userLogin} from '../action/userAction';
import Message from '../components/Message';
import Loader from '../components/Loader';
const LoginPage = () => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const redirect = window.location.search ? window.location.search.split('=')[1] : '/';
  const {userInfo,error,loading}=useSelector(state=>state.userLogin);
  useEffect(() => {
    if(userInfo){
      navigate(redirect);
    }
  }, [userInfo,navigate,redirect])
  
    const loginHandler=(e)=>{
      e.preventDefault();
      dispatch(userLogin({email,password}))
    }
  return (
    <>
     <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
        <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password Address</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' onClick={loginHandler}>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect==='/' ?'/signup': `/signup?redirect=${redirect}`}>
            Register
          </Link>
        </Col>
      </Row>
        </Col>
    </Row>
    </Container>
    
    </>
  )
}

export default LoginPage