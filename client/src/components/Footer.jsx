import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
const Footer = () => {
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    <h5>Copyright &copy; Mursalin Sk</h5>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer