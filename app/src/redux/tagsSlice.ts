import { createSlice } from "@reduxjs/toolkit";
const initialState:string[] = [];
const tagsSlice = createSlice({
    name : "Tags",
    initialState : initialState,
    reducers : {
        addTag(state,action){
            state.push(action.payload);
        },
        clearTags(){
            return initialState;
        }
    }
})

export const {addTag,clearTags} = tagsSlice.actions;

export default tagsSlice.reducer;