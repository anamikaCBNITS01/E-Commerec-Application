import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchProducts } from "../actions/productActions";
import { Row, Col } from "react-bootstrap";
import ProductScreen from "./ProductScreen";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";
import Slider from "./ImageSlider/ImageSlider";
import SliderPage from "./ImageSlider/ImageSlider";
import HomeSlider from "./LandingPageSlider";
import Footer from "../components/footer";

const HomeScreen = () => {

  return (
    <>
      <SliderPage />
      <HomeSlider />
      <Footer/>
    </>
  );
};

export default HomeScreen;
