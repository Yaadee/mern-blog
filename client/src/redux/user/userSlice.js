import {createSlice, current} from '@reduxjs/toolkit';
const initialState = {
    currentUser:null,
    console:null,
    loading:false  
}
const userSlice =createSlice({
    name:'user',
    initialState,
    reducers:{
        signinStart:(state) =>{
            state.loading= true;
            state.error = null;
        },
        singInSuccess:(state,action) =>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;

        },
        signInFailure:(state,action) =>{
            state.loading = false;
            state.error = action.payload;
        },

    }


})
export const {signinStart,singInSuccess,signInFailure} = userSlice.actions;
export default userSlice.reducer;