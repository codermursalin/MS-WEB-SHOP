import React, { useEffect, useState } from 'react'
import { Button,Form,Row,Col, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {userRegister} from '../action/userAction';
import Message from '../components/Message';
import Loader from '../components/Loader';
const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const redirect = window.location.search ? window.location.search.split('=')[1] : '/';
  const {userInfo,error,loading}=useSelector(state=>state.userRegister);
  useEffect(() => {
    if(userInfo){
      navigate(redirect);
    }
  }, [userInfo,navigate,redirect])
  
    const submitHandler=(e)=>{
      e.preventDefault();
      if(password!==confirmPassword){
        setMessage('password not matched');
      }
      else{
        dispatch(userRegister({name,email,password}))
      }
      
    }
  return (
    <>
     <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
        <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

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
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={redirect==='/' ?'/login': `/login?redirect=${redirect}`}>
            Login
          </Link>
        </Col>
      </Row>
        </Col>
    </Row>
    </Container>
    
    </>
  )
}

export default RegisterPage