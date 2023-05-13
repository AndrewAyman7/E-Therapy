import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { updateComment } from "../../redux/api-calls/commentsApi";
import "./comments.css";

const UpdateComment = ({comment ,setUpdateBox})=>{ 
    const dispatch = useDispatch();
    const [content,setContent] = useState(comment?.content);

    const updateForm = (e)=>{
        e.preventDefault();
        if(content.trim() === "")    return toast.error("Comment can't be empty");  // 3lshanlw ms7 elinput w sabo faddy
        dispatch(updateComment(comment?._id, content))
        setUpdateBox(false);
    }
    
    return(
        <>
        <ToastContainer position="top-center" theme="colored"/>
        <div className="update-box2-layer">
        <div className="update-box2">
            <div className="close-form">
                <i class="bi bi-x-circle"  onClick={()=>{setUpdateBox(false)}}></i>
            </div>   
            <div className="post-update-form">
                <h3 className="text-center">Update Comment</h3>
                <form className="m-3"  onSubmit={updateForm}>  {/** Golden Note : onSubmit, not onClick */}
                    <div className="form-group">
                        <label>Comment</label>
                        <input className="form-control"  placeholder="comment"  value={content} onChange={ (e)=>setContent(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn my-btn" >Update Comment</button>
                </form>
            </div>

        </div>
        </div>
        </>
    )

}
export default UpdateComment;