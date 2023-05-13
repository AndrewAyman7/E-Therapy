import axios from "axios";
import { toast } from "react-toastify";
import { authActions } from "../slices/authSlice";
import { postActions } from "../slices/postSlice";
import { profileActions } from "../slices/profileSlice";

// ana 3amel el Api , lw fee page hat el posts by page number , lw mfeesh hat koll elPosts
const getPosts = (page)=>{
    return async (dispatch,getState)=>{
        try{
            let posts = await axios.get(`http://localhost:9000/api/posts?page=${page}`);
            //console.log(posts);
            dispatch(postActions.setPosts(posts.data));
        }catch(err){
            toast.error(err.response.data.message);
        }
    }
}

const getPostsCount = ()=>{
    return async (dispatch,getState)=>{
        try{
            let posts = await axios.get(`http://localhost:9000/api/posts/count`);
            dispatch(postActions.setPostsCount(posts.data));
        }catch(err){
            toast.error(err.response.data.message);
        }
    }
}

// ana 3amel el Api , lw fee category fe el query hat el posts by category , lw mfeesh hat koll elPosts
const getPostsByCategories = (category)=>{
    return async (dispatch,getState)=>{
        try{
            let posts = await axios.get(`http://localhost:9000/api/posts?category=${category}`);
            dispatch(postActions.setPostsCategories(posts.data));
        }catch(err){
            toast.error(err.response.data.message);
        }
    }
}

const createPost = (post)=>{
    return async (dispatch,getState)=>{
        try{
            let state = getState();
            let response = await axios.post(`http://localhost:9000/api/posts` , post , {
                headers: { Authorization: "Bearer " + state.auth.user.token },
                "Content-Type" : "multipart/form-data"
            });
            dispatch(postActions.setNewPostCreated(response.data.post));
        }catch(err){
            console.log(err);
            toast.error(err.response.data.message); // @ToDo Lazem thndlha mn el Backend 
        }
    }
} /** @Todo -> #47 enhancements : Loading Post , createPostState and navigate  */

const createPostNoImg = (post)=>{
    return async (dispatch,getState)=>{
        try{
            let state = getState();
            let response = await axios.post(`http://localhost:9000/api/posts-no-img` , post , {
                headers: { Authorization: "Bearer " + state.auth.user.token }            
            });
            //console.log(response.data.post);
            dispatch(postActions.setNewPostCreated(response.data.post));
        }catch(err){
            console.log(err);
            toast.error(err.response.data.message); 
        }
    }
} 

const getPostById = (id)=>{
    return async (dispatch,getState)=>{
        try{
            let post = await axios.get(`http://localhost:9000/api/posts/${id}`);
            dispatch(postActions.setPost(post.data));
            console.log(post);
        }catch(err){
            toast.error(err.response.data.message);
        }
    }
}

const likePost = (postId)=>{
    return async (dispatch,getState)=>{
        try{
            console.log(postId);
            let post = await axios.put(`http://localhost:9000/api/posts/like/${postId}` , { } , {  // put btb2a mstnya mny data
                headers: { Authorization: "Bearer " + getState().auth.user.token }
            });
            //console.log(post);
            dispatch(postActions.setPostLike(post.data));
        }catch(err){
            //toast.error(err.response.data.message);
        }
    }
}

const likePosts = (postId)=>{
    return async (dispatch,getState)=>{
        try{
            console.log(postId);
            let post = await axios.put(`http://localhost:9000/api/posts/like/${postId}` , { } , {  // put btb2a mstnya mny data
                headers: { Authorization: "Bearer " + getState().auth.user.token }
            });
            //console.log(post);
            dispatch(postActions.setPostsLike(post.data));
        }catch(err){
            //toast.error(err.response.data.message);
        }
    }
}

const likePostProfile = (postId)=>{
    return async (dispatch,getState)=>{
        try{
            console.log(postId); 
            let post = await axios.put(`http://localhost:9000/api/posts/like/${postId}` , { } , {  // put btb2a mstnya mny data
                headers: { Authorization: "Bearer " + getState().auth.user.token }
            });
            //console.log(post);
            dispatch(profileActions.setPostLike(post.data));
        }catch(err){
            //toast.error(err.response.data.message);
        }
    }
}

//---------------- Note ---------------//
// 2 Apis for update post
// 1- update post without image
// 2- update post with image 
// 3shaaan bel image ba7awl eldata le formData 3shan elmulter ta5odha , lakn lw mn 8er img bb3t json data w 5lsa
// w 5ally balek, mynf3sh t3ml el 2 fe api wa7ed -> 3shan fe el UpdatePost Component, msh b3rf a5od elsora elAdema
//                w a3mlha set w tb2a e5tyary zy pa2y elproperties
// ya ema b2a t3ml api lel data lw7dha , w api lel update post lw7do , zy ma hwa 3ml
const updatePost = (newData , postId)=>{
    return async (dispatch,getState)=>{
        try{
            let post = await axios.put(`http://localhost:9000/api/posts/${postId}` , newData , {
                headers: { Authorization: "Bearer " + getState().auth.user.token }
            });
            console.log(post);
            dispatch(postActions.setPost(post.data));
        }catch(err){
            toast.error(err.response.data.message);
            console.log(err);
        }
    }
}
const updatePostWithImg = (newData , postId)=>{
    return async (dispatch,getState)=>{
        try{
            let post = await axios.put(`http://localhost:9000/api/posts/img/${postId}` , newData , {
                headers: { Authorization: "Bearer " + getState().auth.user.token },
                "Content-Type" : "multipart/form-data"
            }); 
            console.log(post);
            dispatch(postActions.setPost(post.data));
        }catch(err){
            toast.error(err.response.data.message);
            console.log(err);
        }
    }
}

const deletePost = (postId)=>{
    return async (dispatch,getState)=>{
        try{
            let post = await axios.delete(`http://localhost:9000/api/posts/${postId}` , {
                headers: { Authorization: "Bearer " + getState().auth.user.token }
            });
            dispatch(postActions.deletePost(post.data.xPost)); // Msh darory, bs 3shan te7ades elstate fe la7zthaa, mn 8er reload .., 3shan elstate tt8yr -> fa elComponent y3ml reload
        }catch(err){
            toast.error(err.response.data.message);
            console.log(err);
        }
    }
}

const getAllPosts = ()=>{
    return async (dispatch,getState)=>{
        try{
            let posts = await axios.get(`http://localhost:9000/api/posts`);
            //console.log(posts);
            dispatch(postActions.setPosts(posts.data));
        }catch(err){
            toast.error(err.response.data.message);
        }
    }
}

export {
    getPosts , getPostsCount, getPostsByCategories, createPost , getPostById ,
    likePost , updatePost , updatePostWithImg , deletePost , getAllPosts, createPostNoImg , likePosts , likePostProfile
} 