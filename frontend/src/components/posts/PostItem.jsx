import {Link, useNavigate} from "react-router-dom";
import "./posts.css";
import { useDispatch, useSelector } from "react-redux";
import {  likePost , likePosts , likePostProfile} from "../../redux/api-calls/postsApi";
import AddComment from "../Comments/AddComment";
import CommentsList from "../Comments/CommentsList";
import { useState } from "react";


const PostItem = ({post,username,userId,profileImg})=>{
    const navigate = useNavigate();
    let {user} = useSelector(state=>state.auth);
    let dispatch = useDispatch();


    const profileLink = userId? `/profile/${userId}` : `/profile/${post?.user?._id}`;  //#52
    const profileName = username? username : post?.user?.username; 
    const profileImage = profileImg? profileImg : post?.user?.profileimg?.url;
    //----------------- Explanation --------------------// /#52
    // ana bnady el <PostItem/> de mn 3 amaken, mn : Home , Posts , Profile
    // el Home w Posts bygeebo elData mn Api el Posts
    // el Profile bygeeb elData mn Api Profile -> (Profile.posts) "populate posts"
    // fa el Posts bta3et el Profile msh feeha el UserId w el Username, fa babaseeha ka props mn elprofile (Profile.username)
    // ezann ana bnady el <PostItem/> mra b 1 props (posts) , w mra b 3 props (profile.posts , username , id)
    // fa b3mll el if conditions dee 3shan a3rf fee kam prop galy , w 3la asaso a3rd elUsername w id

    return(
        <>
        <div className="post-item">
            <div className="post-header-author">
                <div className="post-header-author-img">
                    {
                    profileImage?.startsWith("http") ?   // 3shan ana 3amel default photo lw md5lsh profileimg , btbtdy b http
                    <img src= { profileImage }/> :  
                    <img src= { `http://localhost:9000/${profileImage}` }/>
                    }
                </div>
                <div className="post-header-author-title">
                    <h4> <Link to={profileLink}> {profileName} </Link> </h4>
                    <p> { post?.createdAt.slice(0, 10)} | { post?.createdAt.slice(11, 16)} </p>
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

            { user?  
                <div className="likes">
                    <span className="likes-count"> {post?.likes?.length} </span>
                    <i onClick={()=>{ userId? dispatch(likePostProfile(post?._id)) : dispatch(likePosts(post?._id)) }} // Explain below
                       className= {post?.likes?.includes(user?.id)? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"  }
                       >  <span className="like-span"> Like </span>  </i>
                </div>
                : <></>  // Explain, why 2 dispatches ? -> 3shan fe 2 pages lehom state mo5tlfa
                         // nfs elFekra ely fo2 , f e2ra foo2 , fe posts btegy mn el Posts Api, w fe btegy mn elProfile
            }

            <div className="comments-info">
                <i class="bi bi-chat-right-text comm-pad"></i> { post?.comments?.length } 
            </div>

            <div className="center-det">
                <Link className="post-details-anchor"  to={`/posts/details/${post?._id}`}>
                    <span className="details-span"> Click To See Post Details & Comments </span>  <i class="bi bi-info-circle det-ic"></i>  <i class="bi bi-chat-text det-ic"></i>
                </Link>
            </div>
            
            
        </div>
        {/** Why {post?.title} , whyNot {post.title} , leh ba7ot if elpost mwgood ? -> 3shan lw 7sl moshkla w elpost mgash aw etms7
         *   My2olee error!! , cant get property title of undefined ..
        */}
        </>
    )

}
export default PostItem;