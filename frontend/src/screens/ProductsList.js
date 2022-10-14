import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Row, Col } from "react-bootstrap";
import ProductScreen from "./ProductScreen";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";
import Slider from "./ImageSlider/ImageSlider";
import SliderPage from "./ImageSlider/ImageSlider";
import HomeSlider from "./LandingPageSlider";
import { Box, Divider, Grid, Typography, Button, Snackbar, Alert } from "@mui/material";


import { Link } from "react-router-dom";
import { addToWishlist } from "../actions/wishlistAction";
import { Stack } from "@mui/system";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const [open, setOpen] = React.useState(false);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  
  const addTowishListtHandler = (id) => {
    dispatch(addToWishlist(id))
    setOpen(true);
  };

  return (
    <>
      {/* {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product._id} md={3}>
                <ProductScreen product={product} />
              </Col>
            ))}
          </Row>
        </div>
      )} */}

       {/* pop up messages */}

       <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Product Added In Your Wishlist
          </Alert>
        </Snackbar>
      </Stack>


      <div>
        <div>
          <center><h1>Products</h1></center>
        </div>
        <div>
          <div>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container>
                {
                  products.map((item) => {
                    return (
                      <Box>
                        <Box sx={{ ml: 15, mt: 10, width: '100%', maxWidth: 360, bgcolor: 'background.paper', boxShadow: "2px 2px 15px 2px gray", height: "83%" }}>
                          <Box sx={{ my: 5, mx: 3, width: "90%" }}>
                            <Grid container>
                              <Grid item xs>
                                <Typography gutterBottom variant="h4" component="div" sx={{ paddingTop: "20px" }}>
                                  {item.name}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography sx={{ color: "green", fontWeight: "bold" }} gutterBottom variant="h6" component="div">
                                  <Button sx={{ backgroundColor: "#ff3100 !important", color: "white", fontSize: "10px" }} onClick={() => addTowishListtHandler(item._id)}>
                                    {/* <FavoriteIcon sx={{ color: "red", border: "px solid black" }} /> */}
                                    Add To Wishlist

                                  </Button>
                                </Typography>
                              </Grid>
                            </Grid>
                            <Link to={`/product/${item._id}`}>
                              <Typography color="text.secondary" variant="body2">
                                <Box sx={{
                                  height: 233,
                                  width: 350,
                                  maxHeight: { xs: 233, md: 167 },
                                  maxWidth: { xs: 250, md: 300 },
                                }} component='img' src={item.image} />
                              </Typography>
                            </Link>
                            <Typography sx={{ color: "green", fontWeight: "bold" }} gutterBottom variant="h6" component="div">
                              <span>&#8377;</span>{item.price}
                            </Typography>
                          </Box>
                          <Divider sx={{ position: "relative", bottom: "20px" }} variant="middle" />
                          {/* <Box sx={{ mt: 3, ml: 1, mb: 1, display: "flex", justifyContent: "space-evenly" }}>
                            <Button variant='contained' sx={{ backgroundColor: "#27b9c1 !important" }}><Link to={`/product/${item._id}`} onClick={() => { localStorage.setItem("productID", item._id) }}>Show More...</Link></Button>
                          </Box> */}
                          <Box sx={{ mt: 0, ml: 1, mb: 1, display: "flex", justifyContent: "space-between" }}>
                            <Button variant='contained' sx={{ backgroundColor: "#6594b2 !important" }}><Link style={{ color: "white" }} to={`/product/${item._id}`} onClick={() => { localStorage.setItem("productID", item._id) }}>Show More...</Link></Button>
                            <Button
                              variant="contained"
                              sx={{ backgroundColor: "#a5cc6d !important", position: "relative", right: "5px" }}
                            >Add To Cart</Button>
                          </Box>
                        </Box>

                      </Box>
                    )
                  })
                }
              </Grid>
            </Box>
          </div>
        </div >
      </div >
    </>
  );
};

export default HomeScreen;
