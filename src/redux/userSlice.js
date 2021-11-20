import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: "user",
    initialState: {
        currentUser : null,
        isFetching : false,
        error : false,
    },
    reducers :{
        loginStart : (state) => {
            state.isFetching = true
        },
        loginSuccess : (state,action) => {
            state.isFetching = false;
            state.currentUser = action.payload
        },
        loginFailure : (state) => {
            state.isFetching = false;
            state.error = true
        },
        logout : (state) => {
            state.currentUser = null;
        }
    } 
})


const {actions, reducer} = user
export const {loginFailure, loginSuccess, loginStart,logout} = actions
export default reducer; 