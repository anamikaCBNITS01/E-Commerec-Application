import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { listProductDetails } from "../actions/productActions";
import {
  Row,
  Col,
  ListGroup,
  Image,
  ListGroupItem,
  Form,
  Container,
} from "react-bootstrap";
import { Chip,Button,Rating, Box } from "@mui/material";
import './style.css/ProductDetail.css'
const ProductDetails = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;


  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  const GoBack=()=>{
    history.push('/');
    window.location.reload(true);
  }
  return (
    <Container>
      <Button onClick={GoBack} sx={{backgroundColor:"#343a40 !important", color:"white !important"}}>
        <i className="fas fa-arrow-left    "></i>
        &nbsp; GO BACK
      </Button>

      <Row>
        <Col md={3}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3 className="heading">{product.heading}</h3><Chip label={product.inStock?"in-stock":"out of stock"} color="success" />
            </ListGroupItem>
            <ListGroupItem><h4>{product.name}</h4></ListGroupItem>
            <ListGroupItem>
            <div>{product.rating} Review</div>
            <Box>
            <Rating  name="half-rating" defaultValue={4} readOnly />
            </Box>
            </ListGroupItem>
            <ListGroupItem>Price : &#8377;{product.price}</ListGroupItem>
            <ListGroupItem>{product.details}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroupItem>
            <Row>
              <Col>Status :</Col>
              <Col>
                {product.inStock ? "In Stock " : "out of stock"}
              </Col>
            </Row>
          </ListGroupItem>
          {product.countInStock > 0 && (
            <ListGroupItem>
              <Row>
                <Col>Qty</Col>
                <Form.Control
                  as="select"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </Form.Control>
              </Row>
            </ListGroupItem>
          )}
          <ListGroupItem>
            <Button
              className="btn-block"
              type="button"
              onClick={addToCartHandler}
            >
              Add to cart
            </Button>
          </ListGroupItem>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
