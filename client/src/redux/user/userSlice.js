import { createSlice } from "@reduxjs/toolkit";

const initialState =  {
    currentUser: null,
    error : null,
    loading :false
    

};

const userSlice =  createSlice({
    name :'user',
    initialState,
    reducers : {
        signInStart :(state)=>{
            state.loading = true
        },
        signInSuccess : (state,action)=>{
            state.currentUser = action.payload,
            state.loading = false,
            state.error = null
        },
        signInFailure : (state,action) =>{
            state.loading = false,
            state.error = action.payload
        },
        updateUserStart :(state)=> {
            state.loading = true
        },
        updateUserSuccess : (state,action)=>{
            state.currentUser = action.payload,
            state.loading = false,
            state.error = null
        },
        updateUserFailure : (state,action)=>{
            state.loading = false,
            state.error = action.payload
        },
        deleteUserStart :(state)=> {
            state.loading = true
        },
        deleteUserSuccess : (state,action)=>{
            state.currentUser = null,
            state.loading = false,
            state.error = null
        },
        deleteUserFailure : (state,action)=>{
            state.loading = false,
            state.error = action.payload
        },
        signoutUserStart :(state)=> {
            state.loading = true
        },
        signoutUserSuccess : (state,action)=>{
            state.currentUser = null,
            state.loading = false,
            state.error = null
        },
        signoutUserFailure : (state,action)=>{
            state.loading = false,
            state.error = action.payload
        }
    }
})

export const {signInStart,signInSuccess,signInFailure,
    updateUserStart,updateUserSuccess,updateUserFailure
    ,deleteUserStart,deleteUserSuccess,deleteUserFailure,signoutUserFailure,signoutUserSuccess,signoutUserStart} = userSlice.actions;

export default userSlice.reducer;