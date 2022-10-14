import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Footer from "./components/footer";
import Header from "./components/Header";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductDetails from "./screens/ProductDetails";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProductList from './screens/ProductsList'
import SearchScreen from "./screens/SearchScreen";
import { ToastContainer } from "react-toastify";
import MyDetails from "./screens/MyDetails";
import WishlistScreen from "./screens/WishlistScreen";
import TrendingProducts from "./screens/TrendingProducts";
import TrendingProductList from "./screens/TrendingProductList";


function App() {
  return (
    <Router>
      <Header />
      <main className="my-3">
        <div style={{ width: "100%" }}>
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/myDetails" component={MyDetails} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/wishlist/:id?" component={WishlistScreen} />
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/products" component={ProductList} />
          <Route path="/TrendingProducts" component={TrendingProducts} />
          <Route path="/trending" component={TrendingProductList} />
          <Route path="/search/:key" component={SearchScreen} />
          <Route path="/" component={HomeScreen} exact />
          
        </div>
      </main>
      <ToastContainer/>
    </Router>
  );
}

export default App;
