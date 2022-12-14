import { createSlice } from "@reduxjs/toolkit";

var allCart = JSON.parse(localStorage.getItem("cart"));
// localStorage.removeItem("cart");

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: allCart || [],
  },
  reducers: {
    cartAction: (state, action) => {
      //process and maipulate the data here
      const cart = action.payload;
      //check if cart already exists befire adding new cart
      if (state.value) {
        const cartExist = state.value.some((cartItem) => {
          return cartItem.id === cart.id;
        });
        //add new cart if it dosen't exists
        if (!cartExist) {
          state.value = [...state.value, cart];
          localStorage.setItem("cart", JSON.stringify(state.value));
        } else {
          //remove item from cart
          const newCart = state.value.filter(
            (cartItem) => cartItem.id !== cart.id
          );
          state.value = newCart;
          localStorage.setItem("cart", JSON.stringify(state.value));
        }
      }
    },
  },
});

// this is for dispatch
export const { cartAction } = cartSlice.actions;

// this is for configureStore
export default cartSlice.reducer;
