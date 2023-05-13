import { useParams } from "react-router-dom";
import { useEffect } from "react";
import PostItemDetails from "./PostItemDetails";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../../redux/slices/postSlice";
import { getPostById } from "../../redux/api-calls/postsApi";



const PostDetails = ()=>{ 
    let {id} = useParams();
    let {post}= useSelector(state=>state.post);
    let dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPostById(id)); 
        window.scrollTo(0,0);
    }, [id]);

    //console.log(post)
    return(
        <>
        <PostItemDetails post={post}/>
        </>
    )

}
export default PostDetails;