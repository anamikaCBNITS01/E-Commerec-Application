import { AppBar, Button, Card, Divider, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import '../App.css'

const TrendingProducts = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <Container className='TrendingContainer'>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <div><h1>Trending Products</h1></div>
                <div><Button>View All</Button></div>
            </Box>
            <AppBar position="static" sx={{ display: "flex",backgroundColor:"#f2f3f5" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between",paddingLeft:5,position:"relative",bottom:"10px" }}>
                    {
                        products.slice(0, 3).map((item) => {
                            return (
                                <Box>
                                    <Box sx={{ width: '90%', maxWidth: 360, bgcolor: 'white', boxShadow: "1px 1px 5px 1px #d1d1d1" }}>
                                        <Box sx={{ my: 3, mx: 2 }}>
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
                                                    <Typography gutterBottom variant="h6" component="div">
                                                    &#8377; {item.price}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Typography className='elipsisWrap' color="text.secondary" variant="div">
                                                Pinstriped cornflower blue cotton blouse takes you on a walk to the park or
                                                just down the hall.
                                            </Typography>
                                        </Box>
                                        <Divider variant="middle" />
                                        <Box sx={{ mt: 3, ml: 1, mb: 1 ,display:"flex",justifyContent:"space-evenly" }}>
                                            <Button>Show More...</Button>
                                            <Button>Add to cart</Button>
                                        </Box>
                                    </Box>
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