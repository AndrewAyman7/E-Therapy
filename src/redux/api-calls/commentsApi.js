import axios from "axios";
import { commentActions } from "../slices/commentSlice";
import { toast } from "react-toastify";

import { postActions } from "../slices/postSlice";

const fetchComments = ()=>{
    return async (dispatch,getState)=>{
        try{
            let comments = await axios.get("http://localhost:9000/api/comments/posts" , {
                headers: { Authorization: "Bearer " + getState().auth.user.token }
            });
            dispatch(commentActions.setComments(comments.data)); 
            console.log(comments);
        }catch(err){
            toast.error(err.response.data.message);
            console.log(err);
        }
    }
}

const addComment = (postId,content)=>{
    return async (dispatch,getState)=>{
        try{
            let comment = await axios.post(`http://localhost:9000/api/comments/post/${postId}` , {content} , {
                headers: { Authorization: "Bearer " + getState().auth.user.token }
            });
            dispatch(postActions.addCommentToPost(comment.data.comment));
        }catch(err){
            console.log(err);
            toast.error(err.response.data.message);
        }
    }
}

const updateComment = (commentId,content)=>{
    return async (dispatch,getState)=>{
        try{
            let comment = await axios.put(`http://localhost:9000/api/comment/${commentId}` , {content} , {
                headers: { Authorization: "Bearer " + getState().auth.user.token }
            });
            dispatch(postActions.updatePostComment(comment.data.updatedComm)); 
        }catch(err){
            console.log(err);
            toast.error(err.response.data.message);
        }
    }
}

const deleteComment = (commentId)=>{
    return async (dispatch,getState)=>{
        try{
            let comment = await axios.delete(`http://localhost:9000/api/comment/${commentId}` , {
                headers: { Authorization: "Bearer " + getState().auth.user.token }
            });
            dispatch(commentActions.deleteComment(commentId)); 
            dispatch(postActions.deletePostComment(commentId));
        }catch(err){
            toast.error(err.response.data.message);
        }
    }
}
export { addComment , updateComment, deleteComment , fetchComments}