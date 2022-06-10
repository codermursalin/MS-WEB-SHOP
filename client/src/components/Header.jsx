import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import React from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import { userLogout } from '../action/userAction';
import SearchBox from './SearchBox';
const Header = () => {
  const {userInfo}=useSelector(state=>state.userLogin);
  const dispatch=useDispatch();
  const logoutHandler=()=>{
    dispatch(userLogout());
  }
  return (
    <header>
        <Navbar bg="dark" variant="dark" expand='lg' collapseOnSelect>
  <Container>
    <LinkContainer to='/'>
        <Navbar.Brand>MS WEB SHOP</Navbar.Brand>
    </LinkContainer>
    
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <SearchBox/>
      <Nav className="ms-auto">
        <LinkContainer to='/cart'>
            <Nav.Link> <i className='fas fa-shopping-cart'></i> CART</Nav.Link>
        </LinkContainer>
        {userInfo?(
          <NavDropdown title={userInfo.name} id='username'>
            <LinkContainer to='/profile'>
            <NavDropdown.Item>profile</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Item onClick={logoutHandler}>logout</NavDropdown.Item>
          </NavDropdown>
        ):(<LinkContainer to='/login'>
            <Nav.Link> <i className='fas fa-user'></i> SIGN IN</Nav.Link>
        </LinkContainer>)}
        {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    </header>
  )
}

export default Header