import axios from "axios";
import {
  WISHLIST_ADD_ITEM,
  WISHLIST_REMOVE_ITEM,
  WISHLIST_SAVE_PAYMENT_METHOD,
  WISHLIST_SAVE_SHIPPING_ADDRESS,
} from "../constants/wishlistConstant";

export const addToWishlist = (id, qty) => async (dispatch, getState) => {
  // const { data } = await axios.get(`/api/products/${id}`);
  const {data} = await axios.get(`/api/products/${id}`)
  dispatch({
    type: WISHLIST_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("wishlistItems", JSON.stringify(getState().wishList.wishlistItems));
  localStorage.setItem("wishlisted", JSON.stringify(data._id));
};

export const removeFromWishlist = (id) => (dispatch, getState) => {
  dispatch({
    type: WISHLIST_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("wishlistItems", JSON.stringify(getState().wishList.wishlistItems));
};

// export const increaseProduct=(id)=>(dispatch,getState)=>{
// dispatch({
//   type: INCREASE_PRODUCT,
//   payload:id
// });
// localStorage.setItem("wishlistItems", JSON.stringify(getState().cart.cartItems));
// }

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: WISHLIST_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: WISHLIST_SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
