import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
import { Card, CardContent, CardMedia, IconButton, Typography, Button, Chip, Divider, Fab } from '@mui/material';
import { Box } from '@mui/system';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { listProductDetails } from '../actions/productActions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const SearchScreen = ({ match }) => {
    const [result, setResult] = useState([])
    const [message, setMessage] = useState("");

    const history = useHistory();

    const searchDetails = useSelector((state) => state.searchDetails);
    const { loading, error, product } = searchDetails;

    const productInfo = useSelector((state) => state.productInfo);
    const { searchProduct } = productInfo;
    console.log("productSearchInfo", searchProduct);

    console.log("product", product);
    console.log("productName", result);

    useEffect(() => {
        if (product) {
            console.log("product available", product);
            setResult(product)
            // window.location.reload();
        } else {
            console.log("product available")
        }
    }, [product])

    const backToHome=()=>{
        history.push('/')
        window.location.reload();
    }


    return (
        <Container>
            <div>
                <Button sx={{backgroundColor:"#343a40 !important"}} onClick={backToHome} variant='contained'><ArrowBackIcon/> Go Back to Home </Button>
            </div>
            <h2 style={{marginTop:"10px"}}>Search Results</h2>
            <div>
                {error && <Message varient="danger">{error}</Message>}

                {loading && <Loader />}
                {message && <Message variant="danger">{message}</Message>}

                {/* <h1>{product.name}</h1> */}
                {
                    result.length > 0 ?
                        <div>{result.map((products) => {
                            return (
                                <div>
                                    <Card sx={{ display: 'flex' }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 200 }}
                                            image={products.image}
                                            alt="Live from space album cover"
                                        />
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Typography component="div" variant="h5">
                                                    {products.name} {' '} <Chip label={products.inStock ? "in stock" : "out of stock"} color="success" />
                                                </Typography>
                                                <Divider sx={{ marginTop: "10px" }} />
                                                <Typography sx={{ marginTop: "10px", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block", overflow: "hidden", width: "50rem" }} variant="subtitle1" color="text.secondary" component="div">
                                                    <Box sx={{ fontWeight: "bold" }}>Details : </Box>
                                                    {products.details}
                                                </Typography>
                                                <Divider sx={{ marginTop: "10px" }} />
                                                <Box sx={{ marginTop: "10px" }}>
                                                    Price : {products.price}
                                                </Box>
                                                <Divider sx={{ marginTop: "10px" }} />
                                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                                    <Button variant='contained' sx={{ marginRight: "10px" }}>Show More</Button>
                                                    <Button type="button" variant='contained'>Add to Cart</Button>
                                                </Box>
                                            </CardContent>
                                        </Box>
                                    </Card>
                                </div>
                            )
                        })}</div>
                        : <div>NO data</div>
                }
            </div>
        </Container>
    )
}

export default SearchScreen