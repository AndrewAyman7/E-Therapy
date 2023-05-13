import {createSlice} from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
        categoryInfo : null
    },  
    
    reducers : {                    
        setCats(state,action){    
            state.categories = action.payload;
        },
        addCat(state,action){
            state.categories.push(action.payload);
        },
        /* @ToDo
        deleteCat(state,action){
            state.categories = state.categories.filter(c=>c._id !== action.payload);
        }
        */
       setCategoryInfo(state,action){
        state.categoryInfo = action.payload;
       }
    }
});

const categoryReducer = categorySlice.reducer;
const categoryActions = categorySlice.actions;

export {categoryReducer,categoryActions}