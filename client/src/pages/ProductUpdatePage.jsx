import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import {productDetails, updateProduct} from '../action/productAction';
import {useDispatch,useSelector} from 'react-redux'
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import axios from 'axios';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstant';
const ProductUpdatePage = () => {
  const {id}=useParams();
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const { userInfo }=useSelector((state) => state.userLogin)
    const {product,loading,error}=useSelector(state=>state.productDetails);
    const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate
    useEffect(() => {
      if (!userInfo || !userInfo.isAdmin) {
        navigate('/login')
      }
      if(successUpdate){
        dispatch({ type: PRODUCT_UPDATE_RESET })
        navigate('/admin/productlist')
      }
      if (!product.name || product._id !== id) {
        dispatch(productDetails(id))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }, [dispatch,product,id,successUpdate,navigate,userInfo])

    const uploadFileHandler = async (e) => {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image', file)
      setUploading(true)
  
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
  
        const { data } = await axios.post('/api/upload', formData, config)
  
        setImage(data)
        setUploading(false)
      } catch (error) {
        console.error(error)
        setUploading(false)
      }
    }
    const submitHandler=(e)=>{
        e.preventDefault()
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    )
    }
  return (
    <>  
    <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
    </Link>

    <h1>Update Product</h1>
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

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Group controlId="formFile" className="mb-3"  value={image} onChange={uploadFileHandler}>
    <Form.Label>image</Form.Label>
    <Form.Control type="file"/>
  </Form.Group>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
  
  </>
  )
}

export default ProductUpdatePage