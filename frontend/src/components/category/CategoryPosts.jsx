import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPostsByCategories } from "../../redux/api-calls/postsApi";
import Posts from "../posts/Posts";
import "./postscategory.css";
import Sidebar from "../posts/Siderbar";
import { getCategoryInfo } from "../../redux/api-calls/categoryApi";
import axios from "axios";


const CategoryPosts = ()=>{
    const dispatch = useDispatch();
    const {postsCategories} = useSelector(state=>state.post);
    const {categoryInfo} = useSelector(state=>state.category);
    let {category} = useParams();

    /*const getCategoryRoom = async()=>{
        try{
            const res = await axios.get(`http://localhost:9000/api/getRoom/${category}`);
            console.log(res);
        }catch(err){
            console.log(err);
        }
    }*/

    useEffect(()=>{
        dispatch(getPostsByCategories(category));
        dispatch(getCategoryInfo(category));
        //getCategoryRoom();
        window.scrollTo(0,0);
    },[category]);

    return(
        <>
        <div className="posts-by-category">
            <div className="category-details">
                <h1 className="cat-info-h"> {category} </h1>
                {categoryInfo?.map(el=>( <p className="category-info"> {el.details} </p> ))} 
                <div className="category-help">
                    <h2> Get Some Help </h2>
                    <p> if you have a question or feeling you wanna share, you can let your question and let people help you </p>
                    <p> or join the {`${category}`} room and write your message and wait people to answer  </p>
                    <div className="categ-help-prop">
                        <Link className="cp-link" to="/posts/create-post"> Write Your Question </Link>
                        <Link className="cp-link" to="/rooms"> Join {`${category}`} Room </Link>
                    </div>
                    
                </div>
            </div>
            <h1 className="categ-posts-h"> {`${category}  Posts`  } </h1>
            <div className="home-container container-fluid">
                <div className="post-list"> <Posts posts={postsCategories}/> </div>
                <div className="post-sidebar"><Sidebar/></div>
            </div>
        </div>

        </>
    )

}
export default CategoryPosts;