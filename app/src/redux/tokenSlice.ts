import { createSlice } from "@reduxjs/toolkit";
const initialState = "";

const tokenSlice = createSlice({
    name : 'Token',
    initialState: initialState,
    reducers: {
        setToken(state,action){
            state = action.payload;
            return state;
        }
    }
});


export const {setToken}  = tokenSlice.actions;

export default tokenSlice.reducer;