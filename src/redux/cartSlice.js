import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity : 0,
        totalPrice : 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity = action.payload.quantity;
            state.totalPrice= action.payload.totalPrice;
            state.products = action.payload.products
            
        },
        resetProduct: (state, action) => {
            state.products = action.payload.products;
            state.totalPrice = action.payload.totalPrice;
            state.quantity = action.payload.quantity
        },
        removerProduct : (state, action) => {
            console.log(action)
            if(state.quantity >=1) state.quantity -= 1;
        
            state.totalPrice -= action.payload.price;
            state.products =  state.products.filter(item=>item._id !== action.payload.id);
        }
        
    }
})

const {actions, reducer} = cartSlice;
export const {addProduct, resetProduct,removerProduct} = actions;
export default reducer; 