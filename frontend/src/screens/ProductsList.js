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
import { Box, Divider, Grid, Typography ,Button} from "@mui/material";


import { Link } from "react-router-dom";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

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
                                            {item.trending === true ?
                                                <Box sx={{ ml: 15, mt: 10, width: '100%', maxWidth: 360, bgcolor: 'background.paper', boxShadow: "2px 2px 15px 2px gray",height:"83%" }}>
                                                    <Box sx={{ my: 5, mx: 3 ,width:"90%"}}>
                                                        <Grid container>
                                                            <Grid item xs>
                                                                <Typography gutterBottom variant="h4" component="div" sx={{paddingTop:"20px"}}>
                                                                    {item.name}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography sx={{ color: "green", fontWeight: "bold" }} gutterBottom variant="h6" component="div">
                                                                    <span>&#8377;</span>{item.price}
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
                                                    </Box>
                                                    <Divider variant="middle" />
                                                    <Box sx={{ mt: 3, ml: 1, mb: 1, display:"flex",justifyContent:"space-evenly" }}>
                                                        <Button variant='contained' sx={{ backgroundColor: "#27b9c1 !important" }}><Link to={`/product/${item._id}`} onClick={() => { localStorage.setItem("productID", item._id) }}>Show More...</Link></Button>
                                                    </Box>
                                                </Box>
                                                : null
                                            }

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
