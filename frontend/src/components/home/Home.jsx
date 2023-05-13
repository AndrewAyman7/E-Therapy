import Posts from "../posts/Posts";
import "./home.css";
import Sidebar from "../posts/Siderbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "../../redux/api-calls/postsApi";


const Home = ()=>{ 
    const dispatch = useDispatch();
    const {posts} = useSelector(state=>state.post);
    useEffect(()=>{
        dispatch(getPosts(1));
    },[posts])
    return(
        <>
        <section className="home">
            <div className="home-header">
                <div className="home-header-content">
                    <h1>Welcome to our Blog</h1>
                </div>
            </div>

            <div className="home-latest-posts container-fluid">
                <h1>latest posts</h1>
            </div>

            <div className="home-container">
                <div className="post-list"> <Posts posts={posts}/> </div>
                <div className="post-sidebar"><Sidebar/></div>
            </div>

            <div className="go-to-all-posts">
                <Link to={"/posts"} className="btn my-btn"> See All Posts </Link>
            </div>
        </section>

        </>
    )

}
export default Home;