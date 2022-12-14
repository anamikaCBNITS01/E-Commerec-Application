import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
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
import { Chip, Button, Rating, Box, Snackbar, Alert } from "@mui/material";
import './style.css/ProductDetail.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addToWishlist } from "../actions/wishlistAction";
import { Stack } from "@mui/system";
const ProductDetails = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [isFav, setIsFav] = useState(false);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const ids = useParams();

  const productId = match.params.id;
  // const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const [price, setPrice] = useState('');

  const [open, setOpen] = React.useState(false);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToWishlist(productId));
    }
  }, [dispatch, productId]);


  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
    dispatch(addToWishlist(match.params.id))
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const addTowishListtHandler = (id) => {
    dispatch(addToWishlist(id))
    setOpen(true)
  };


  const GoBack = () => {
    history.push('/');
    window.location.reload(true);
  }

  const wishList = useSelector((state) => state.wishList);
  const { wishlistItems } = wishList;
  // console.log("wishlistItems productsDetails",product);
  // console.log("wishlistItems product wishlist",wishlistItems);


  return (
    <Container>

      {/* pop up messages */}

      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Product Added In Your Wishlist
          </Alert>
        </Snackbar>
      </Stack>

      <Button onClick={GoBack} sx={{ backgroundColor: "#343a40 !important", color: "white !important" }}>
        <i className="fas fa-arrow-left    "></i>
        &nbsp; GO BACK
      </Button>

      <Row>
        <Col md={2}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3 style={{ letterSpacing: "1px" }} className="heading">{product.heading}</h3><Chip label={product.inStock ? "in-stock" : "out of stock"} color="success" />
            </ListGroupItem>
            <ListGroupItem><h4>{product.name}</h4></ListGroupItem>
            <ListGroupItem>
              <div>{product.rating} Review</div>
              <Box>
                <Rating name="half-rating" defaultValue={4} readOnly />
              </Box>
            </ListGroupItem>
            <ListGroupItem>Price : &#8377;{product.price}</ListGroupItem>
            <ListGroupItem>{product.details}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
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
          <ListGroupItem style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Button
              className="btn-block"
              type="button"
              onClick={addToCartHandler}
              variant="contained"
              sx={{ backgroundColor: "#a5cc6d !important" }}
            >
              Add to cart
            </Button>

            {/* <Button onClick={()=>addTowishListtHandler(product.id)}>{product._id? <FavoriteIcon sx={{color:"red", border:"px solid black"}}/>: <FavoriteBorderIcon sx={{color:"black"}}/>}</Button> */}
          </ListGroupItem>
          <ListGroupItem>
            <Button
              className="btn-block"
              sx={{ backgroundColor: "#ff3100 !important", color: "white" }}
              onClick={() => addTowishListtHandler(product.id)}
            >
              Add To Wishlist

            </Button>
          </ListGroupItem>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
