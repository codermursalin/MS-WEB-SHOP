import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import UserListPage from './pages/UserListPage';
import UserEditScreen from './pages/UserEditScreen';
import ProductListPage from './pages/ProductListPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import './bootstrap.min.css';
import './App.css';
import ProductUpdatePage from './pages/ProductUpdatePage';
import OrderListPage from './pages/OrderListPage';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path='/page/:pageNumber' element={<Home/>}/>
          <Route
            path='/search/:keyword/page/:pageNumber'
            element={<Home/>}
            exact
          />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart/:id" element={<CartPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            <Route path="/order/:id" element={<OrderPage/>} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin/userlist" element={<UserListPage />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            
            <Route path="/admin/productlist" element={<ProductListPage />} />
            <Route path="/admin/productlist/:pageNumber" element={<ProductListPage />} />
            <Route path="/admin/product/:id/edit" element={<ProductUpdatePage />} />
            <Route path="/admin/orderlist" element={<OrderListPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />

    </BrowserRouter>
  );
}

export default App;
