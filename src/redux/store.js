import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { categoryReducer } from "./slices/categorySlice";
import { commentReducer } from "./slices/commentSlice";
import { postReducer } from "./slices/postSlice";
import { profileReducer } from "./slices/profileSlice"; 
import { friendsReducer } from "./slices/friendsSlice";


const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        post: postReducer,
        category: categoryReducer,
        comment: commentReducer,
        friends: friendsReducer
    }
});

export default store;