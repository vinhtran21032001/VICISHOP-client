import { createSlice } from "@reduxjs/toolkit";




const registor = createSlice({
    name : "registor",
    initialState:{
        isFetching : false,
        Success : false,
        Error: false,
    },
    reducers:{
        registerStart : (state) => {
            state.isFetching = true
        },
        registerSuccess : (state) => {
            state.isFetching  = false
            state.Success = true
            state.Error = false
        },
        registerFail : (state) => {
            state.isFetching  = false
            state.Error = true
            state.Success = false
        }
    }
})


const { actions, reducer} = registor;
export const {registerFail, registerStart, registerSuccess} = actions
export default reducer