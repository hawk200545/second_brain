import { createSlice } from "@reduxjs/toolkit";
const initialState: boolean = false;

const modalSlice = createSlice({
    name : "Modal",
    initialState : initialState,
    reducers : {
        toggleModal(state){
            return !state;
        },
        setModal(state,action){
            state = action.payload;
        }
    }
})

export const {toggleModal} = modalSlice.actions;

export default modalSlice.reducer;