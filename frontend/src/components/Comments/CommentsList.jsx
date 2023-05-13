import "./comments.css";
import swal from "sweetalert";
import { Link, useNavigate} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import UpdateComment from "./UpdateComment";
import { deleteComment } from "../../redux/api-calls/commentsApi";
import { useDispatch } from "react-redux";

const CommentsList = ({comments , goToNewComment , user})=>{ 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [updateBox , setUpdateBox] = useState(false);
    const [comment,setComment] = useState("");

    //console.log(comments);

    const deleteHandler = (id)=>{ 
        swal({
            title: "Are You Sure To Delete ?",
            icon: "warning",
            buttons: true
        }).then(clicked=>{
            if(clicked){
                dispatch(deleteComment(id));
            }
        })
    }

    const handleUpdateComment=(c)=>{  // lazem 3shan abaasy elComment
        setComment(c);
        setUpdateBox(true);
        //console.log(c);
    }

    const goToLastComment = useRef(null);

    /*useEffect(()=>{ // i replaced it with flex-reverse
        goToLastComment.current?.scrollIntoView(); 
    },[goToNewComment])*/ 

    return(
        <>
        <div className="comments-container">
            {
                comments?.map((c)=>(
                    <>
                    <div className="comment">
                        <Link className="comment-user-a" to={`/profile/${c.userId}`}> <p className="comment-user-a">{c.username}</p> </Link>
                        <h3 className="comment-title">{c.content}</h3>
                        <p className="comment-date"> { c.createdAt.slice(0, 10)} | { c.createdAt.slice(11, 16)} </p>
                    </div>
                    <div className="comment-icons">
                        {
                            (user && c.userId ===user.id)? <>
                                <i className="bi bi-pencil-square" onClick={()=>handleUpdateComment(c)}></i>
                                <i className="bi bi-trash3" onClick={()=>deleteHandler(c?._id)}></i> 
                            </>:<></>
                        }
                    </div>
                    <hr/>
                    </>
                )
                
                )
            }
            {/*<div ref={goToLastComment}/> */}

        {updateBox? <UpdateComment  comment={comment} setUpdateBox={setUpdateBox}/> : null}
        </div>

        

        </>
    )

}
export default CommentsList;