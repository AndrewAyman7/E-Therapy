import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import swal from "sweetalert";
import { deletePost, likePost } from "../../redux/api-calls/postsApi";
import AddComment from "../Comments/AddComment";
import CommentsList from "../Comments/CommentsList";
import "./posts.css";
import UpdatePost from "./UpdatePost";
import axios from "axios";
import Report from "./Report";
const PostItemDetails = ({post})=>{
    const navigate = useNavigate();
    let dispatch = useDispatch();
    const [updateBox,setUpdateBox] = useState(false); 
    let {user} = useSelector(state=>state.auth);

    const [reportBox,setReportBox] = useState(false);

    const [postLikes,setLikesPost] = useState([]);

    const getPostLikes = async()=>{
        try{
            let likesRes = await axios.get(`http://localhost:9000/api/post/likes/${post._id}`);
            setLikesPost(likesRes.data.likes);
            console.log(likesRes);
        }catch(err){

        }
    }


    useEffect(()=>{
        getPostLikes();
    } , [post?._id])


    const deleteHandler = ()=>{ 
        swal({
            title: "Are You Sure To Delete ?",
            icon: "warning",
            buttons: true
        }).then(clicked=>{
            if(clicked){
                //swal("post has been deleted" , {icon:"success"});
                dispatch(deletePost(post?._id));
                navigate("/posts");
            }
        })
    }

    const [goToNewComment , setGoToNewComment] = useState(""); // 3shan lma y add new comment, 5ale elSaf7a troo7 lel comment da

    return(
        <>
        <div className="post-item post-item-details">
            <div className="post-header-author">
                <div className="post-header-author-img">
                    {
                    post?.user?.profileimg?.url.startsWith("http") ?   // 3shan ana 3amel default photo lw md5lsh profileimg , btbtdy b http
                    <img src= { post?.user?.profileimg?.url }/> :  
                    <img src= { `http://localhost:9000/${post?.user?.profileimg?.url}` }/>
                    }
                </div>
                <div className="post-header-author-title">
                    <h4> <Link to={`/profile/${post?.user?.id}`}> {post?.user?.username} </Link> </h4>
                    <p> { post?.createdAt.slice(0, 10)} : { post?.createdAt.slice(11, 16)} </p>
                </div>
            </div>
            
            {
                post?.image?.url ? 
                    <img src= { post? `http://localhost:9000/${post?.image?.url}` : null} className="post-item-img"/> : <></>
            }


            <div className="post-content-text">
                <p> {post?.title} </p>
                <p> {post?.content} </p>
            </div>

            <div className="cat">
                    <Link to={`/posts/category/${post?.category}`}> {post?.category} </Link>
            </div>

            {
                user?.id === post?.user?.id ? <>
                    <div className="post-update-delete-settings">
                        <div className="delete-post">{/* @ToDo : SweetAlert */}
                            <i  onClick={deleteHandler} className="bi bi-trash3">Delete Post </i> 
                        </div>
                        <div className="update-details">   {/* @ToDo : #28 , min 30 -> Trick to see photo and try it before update it*/}
                            <i className="bi bi-pencil-square" onClick={()=>{setUpdateBox(true)}}>
                                Click To Update
                            </i>
                        </div> 
                    </div>
                </> : <></>
            }          

            { user?  
                <div className="likes">
                    <span className="likes-count"> {post?.likes?.length} </span>
                    <i onClick={()=>{dispatch(likePost(post?._id))}}
                       className= {post?.likes?.includes(user?.id)? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"  }
                       >  <span className="like-span"> Like </span>  </i>
                </div>
                : <></>
            }

            {
                postLikes?.length >0 ? <>
                    <div className="see-likes dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        see likes
                    </div>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {
                            postLikes?.map(like=>(
                                <a key={like._id} class="dropdown-item" href={`/profile/${like._id}`}>{like.username}</a>
                            ))
                        }
                        
                    </div>
                </> : <></>
            }

            {/* user?  
                <div className="likes">
                    {
                        post?.likes?.length > 0 ? <>
                            <span className="likes-count dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> {post?.likes?.length} </span>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {
                                post?.likes?.map(like=> (
                                    <a class="dropdown-item" href={`/profile/${like.id}`}> {like.username} </a>
                                ))
                            }
                            </div>
                        </> : <>
                            <span className="likes-count"> {post?.likes?.length} </span>
                        </>
                    }
                    
                    <i onClick={()=>{dispatch(likePost(post?._id))}}
                       className= {post?.likes?.filter(like=> like._id === user?.id ).length > 0  ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"  }
                    >  <span className="like-span"> Like </span>  </i>
                </div>
                : <></>
                */}

            {
                user? <>
                <div className="report" onClick={()=> setReportBox(true)}>
                    <span className="report-text"> Report</span>
                    <i className="bi bi-megaphone report-icon"></i>
                </div>
                </> : <></>
            } 

            { user? <AddComment postId={post?._id} setGoToNewComment={setGoToNewComment} /> : <></> }
            <CommentsList comments={post?.comments} goToNewComment={goToNewComment} user={user} />

            { updateBox ?  <UpdatePost post={post} setUpdateBox={setUpdateBox} /> : null}
            { reportBox? <Report post={post} setReportBox={setReportBox} /> : null }

{/** Taaany , leh {post?.title} msh {post.title} -> 3shan awl ma yft7 elsaf7a hykoon lesa mgbsh elresponse ,3shan el post awl mra hyb2a null fa haydrbly error */}   

        </div>


        {/* @ToDo -> Update Img, and Post */}
        <div className="update-post"></div>
        </>
    )

}
export default PostItemDetails;