import React, { useEffect, useState } from "react";
import Message from "../components/shared/Message";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Form,
  Card,
  Image,
  ListGroup,
  ListGroupItem,
  Container,
} from "react-bootstrap";
import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { addToWishlist, removeFromWishlist } from "../actions/wishlistAction";
import FavoriteIcon from '@mui/icons-material/Favorite';

const WishlistScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  // const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const [price,setPrice]=useState('')
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToWishlist(productId));
    }
  }, [dispatch, productId]);

  const wishList = useSelector((state) => state.wishList);
  const { wishlistItems } = wishList;
  console.log("wishlistItems screen",wishlistItems);

  const removeFromWishlistHandler = (id) => {
    dispatch(removeFromWishlist(id));
  };


  const checkout = () => {
    history.push("/login?redirect=shipping");
  };

  const backToHome=()=>{
    history.push('/')
    window.location.reload();
}
  return (
    <Container>
    <Button onClick={backToHome} variant="contained" sx={{backgroundColor:"#343a40 !important",color:"white"}}><ArrowBackIcon/> Go Back To Home</Button>
      <Row>
        <Col md={8}>
          <h1 style={{marginTop:"10px"}}>Wishlist</h1>
          {wishlistItems.length === 0 ? (
            <Message>
              Your wishlist is Empty !<Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {wishlistItems.map((item) => (
                <ListGroupItem>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>&#8377;{item.price}</Col>
                    <Col md={2}>
                      {/* <Button>+</Button> */}
                      {/* <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i
                          className="fa fa-trash text-danger"
                          aria-hidden="true"
                        ></i>
                      </Button> */}

                      {/* <Button></Button> */}
                      <Button fullWidth onClick={() => removeFromWishlistHandler(item.product)}> <FavoriteIcon sx={{color:"red", border:"px solid black"}}/>{' '}{' '} Remove </Button>
                      {/* <Button
                      type="button"
                        variant="light"
                        onClick={() => incraeseProductData(item.product)}
                      >Add</Button> */}
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default WishlistScreen;
