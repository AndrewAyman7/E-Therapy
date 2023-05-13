import {createSlice} from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        postsCount: null,
        postsCategories: [],
        /** @Todo -> #47 enhancements : Loading Post , createPostState and navigate  */

        newPostCreated: null,

        post: null
    },  
    
    reducers : {                    
        setPosts(state,action){    
            state.posts = action.payload;
        },
        setPostsCount(state,action){    
            state.postsCount = action.payload;
        },
        setPostsCategories(state,action){    
            state.postsCategories = action.payload;
        },
        /** @Todo -> #47 enhancements : Loading Post , createPostState and navigate  */

        setPost(state,action){
            state.post = action.payload;
        },
        setNewPostCreated(state,action){
            state.newPostCreated = action.payload;
        },
        setPostLike(state,action){
            state.post.likes = action.payload.likes;

        },
        setPostsLike(state,action){
            let postIndex = state.posts.findIndex((p) => p._id == action.payload._id); 
            state.posts[postIndex].likes = action.payload.likes;
        },
        deletePost(state,action){ // Msh darory, bs 3shan te7ades elstate fe la7zthaa, mn 8er reload .., 3shan elstate tt8yr -> fa elComponent y3ml reload
            state.posts = state.posts.filter(p=> p._id !== action.payload);
        },
        addCommentToPost(state,action){
            state.post.comments.push(action.payload);
        },
        updatePostComment(state,action){
            state.post.comments = state.post.comments.map(c=>{
                return c._id === action.payload._id ? action.payload : c ;
            });
        },
        deletePostComment(state,action){
            let comment = state.post.comments.find(c=> c._id===action.payload);
            let commentIndex = state.post.comments.indexOf(comment);
            state.post.comments.splice(commentIndex,1);
        }
    }
});

const postReducer = postSlice.reducer;
const postActions = postSlice.actions;

export {postReducer,postActions}