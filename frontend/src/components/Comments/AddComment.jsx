import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { addComment } from "../../redux/api-calls/commentsApi"; 

const AddComment = ({postId , setGoToNewComment})=>{ 
    const dispatch = useDispatch();
    const [comment,setComment] = useState("");

    const postComment = (e)=>{
        e.preventDefault();
        if(comment.trim() === "")  return toast.error("Comment can't be empty");  
        dispatch(addComment(postId,comment));
        toast.success("You have just commented this post");
        setGoToNewComment(comment);
        setComment(""); // 3shan afddy el input
    }

    /* @ToDo -> Delete and Update Comment , be nfs tre2a elpost */

    return(
        <>
        <div className="comment-container">
        <ToastContainer position="top-center" theme="colored"/>
            <form className="m-3 col-6" onSubmit={postComment}>
                <div className="form-group">
                    <label>Add Comment</label>
                    <input className="form-control"  placeholder="Comment" value={comment} onChange={(e)=>{setComment(e.target.value)}} />
                </div>
                <button type="submit" className="btn my-btn">Comment</button>
            </form>
        </div>
        </>
    )

}
export default AddComment;