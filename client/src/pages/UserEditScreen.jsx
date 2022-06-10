import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {getUserDetails, adminUpdateUserDetails} from '../action/userAction';
import {Form,Button,Row,Col,Container} from 'react-bootstrap'
import Message from '../components/Message';
import Loader from '../components/Loader';
const UserEditScreen = () => {
    const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const {id}=useParams();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {userInfo}=useSelector(state=>state.userLogin);
  const {user,loading,error}=useSelector(state=>state.userDetails);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  }=useSelector(state=>state.adminUserUpdate);
  useEffect(() => {
    if(!userInfo){
      navigate('/login');
    }
    else{
        if(!user.name || user._id!==id){
            dispatch(getUserDetails(id));
        }
        else{
            setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
        }
    }
  }, [userInfo,navigate,user,dispatch,successUpdate,id])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(adminUpdateUserDetails({id,name, email, isAdmin }))
  }
  
  return (
    <>
        <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </Col>
      </Row>
      </Container>
    </>
  )
}

export default UserEditScreen