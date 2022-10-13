import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Card, CardActions, CardContent, CardMedia, Divider, Grid, Typography, Button } from '@mui/material'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../App.css'
import { Box } from "@mui/system";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
const HomeSlider = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    let navigate = useHistory();

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <Container className="containerDiv">
            <div className="FlexDiv">
                <h1>Products</h1>
                <Button onClick={() => navigate.push('/products')}>View All</Button>
            </div>
            <Slider className="SliderData" {...settings}>
                {products.map((product) => (
                    <Box key={product._id} sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
                        <Box>
                            <Typography color="text.secondary" variant="body2">
                                <Box sx={{
                                    height: 233,
                                    width: 350,
                                    maxHeight: { xs: 233, md: 167 },
                                    maxWidth: { xs: 250, md: 280 }, position: "relative"
                                }} component='img' src={product.image} />
                            </Typography>
                        </Box>

                        <Typography gutterBottom variant="h5" component="div">
                            {product.name}
                        </Typography>

                        <Typography gutterBottom variant="h6" component="div">
                            &#8377;{product.price}
                        </Typography>

                        {/* <Divider variant="middle" />
                        <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
                            <Button>Add to cart</Button>
                        </Box> */}
                    </Box>
                ))}
            </Slider>
        </Container>
    );
};

export default HomeSlider;
