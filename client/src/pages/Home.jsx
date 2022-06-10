import React, { useEffect } from 'react';
import {Row,Col} from 'react-bootstrap';
import Product from '../components/Product';
import {productList} from '../action/productAction';
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
const Home = () => {
  let {keyword,pageNumber}=useParams();
  if(!pageNumber) pageNumber=1;
  console.log(keyword);
    const dispatch=useDispatch();
    const {loading,products,error,page, pages}=useSelector(state=>state.productList);
    useEffect(() => {
      dispatch(productList(keyword,pageNumber));
    }, [dispatch,keyword,products,pageNumber])
    
  return (
    <>
        <h1>Latest Products</h1>
        {loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:
            <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          <Paginate
           pages={pages}
           page={page}
           keyword={keyword ? keyword : ''}
         />
          </Row>
        }
    </>
  

  )
}

export default Home