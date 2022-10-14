import { AppBar, Badge, Button, Card, Divider, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { listProductDetails, listProducts } from '../actions/productActions'
import { addToCart } from '../actions/cartAction'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import '../App.css'

const TrendingProducts = ({ match }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [qty, setQty] = useState(1);
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const addToCartHandler = (id) => {
        dispatch(addToCart(id))
        history.push(`/cart/${id}?qty=${qty}`)
    }

    const productDetailsHandler = (id) => {
        dispatch(listProductDetails(id))
        history.push(`/product/${id}`)
    }

    const navigate = useHistory();

    return (
        <Container className='TrendingContainer'>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <div><h1 style={{ letterSpacing: "1px" }}>Trending Products</h1></div>
                <div><Button onClick={() => navigate.push('/trending')} variant="contained" sx={{backgroundColor:"#177787 !important"}}>View All </Button></div>
            </Box>
            <AppBar position="static" sx={{ display: "flex", backgroundColor: "#f2f3f5", marginTop: "10px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", paddingLeft: 5, position: "relative", bottom: "10px" }}>
                    {
                        products.map((item) => {
                            console.log('item', item)
                            return (
                                <Box>
                                    {item.trending === true ?
                                        <Box sx={{ width: '90%', maxWidth: 360, bgcolor: 'white', boxShadow: "1px 1px 5px 1px #d1d1d1" }}>
                                            <Box sx={{ my: 3, mx: 3 }}>
                                                <Badge anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }} color="success" badgeContent={'Trending Now'}>
                                                    <Grid container alignItems="center">
                                                        <Grid item xs>
                                                            <Box sx={{
                                                                height: 233,
                                                                width: 350,
                                                                maxHeight: { xs: 233, md: 167 },
                                                                maxWidth: { xs: 250, md: 280 }, position: "relative"
                                                            }} component='img' src={item.image} />
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography sx={{ color: "green" }} gutterBottom variant="h6" component="div">
                                                                &#8377; {item.price}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Badge>
                                                <Typography className='elipsisWrap' color="text.secondary" variant="div">
                                                    {item.details}
                                                </Typography>
                                            </Box>
                                            <Divider variant="middle" />
                                            <Box sx={{ mt: 3, ml: 1, mb: 1, display: "flex", justifyContent: "space-between",position:"relative",bottom:"5px" , right:"5px" }}>
                                                <Button
                                                 onClick={() => productDetailsHandler(item._id)}
                                                 variant="contained"
                                                 sx={{backgroundColor:"#6594b2 !important"}}
                                                 >Show More...</Button>
                                                <Button
                                                    onClick={() => addToCartHandler(item._id)}
                                                    variant="contained"
                                                    sx={{ backgroundColor: "#a5cc6d !important" }}
                                                >Add to cart</Button>
                                            </Box>
                                        </Box>
                                        : null
                                    }
                                </Box>
                            )
                        })
                    }
                </Box>
            </AppBar>
        </Container>
    )
}

export default TrendingProducts