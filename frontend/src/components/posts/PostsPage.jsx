import PostItem from "./PostItem";
import Posts from "./Posts";
import Sidebar from "./Siderbar";
import Pagination from "./Paginations";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../../redux/slices/postSlice";
import { getPosts, getPostsCount } from "../../redux/api-calls/postsApi"; 

const PostsPage = ()=>{
    const [page,setPage] = useState(1);
    const {postsCount , posts} = useSelector(state=>state.post);
    const dispatch = useDispatch();

    const pages = Math.ceil(postsCount/3);

    useEffect(()=>{
        dispatch(getPosts(page));
        window.scrollTo(0,0);
    }, [page]); // koll ma eluser y8yr rakm elpage , hat elposts mn elawl b elpage elgdeda

    useEffect(()=>{   // ana 3ayez ageeb num of pages awl ma yft7 elsaf7a , mra 1 bs
        dispatch(getPostsCount()); // hygeeb 3dd elpages mn elApi w yroo7 y3mla set fe elstore
        console.log(postsCount)
    },[]);

    return(
        <>

        <section className="home">
            <div className="home-header">
                <div className="home-header-content">
                    <h1 className="intro-blog-header">Welcome to our Blog</h1>
                </div>
            </div>
            <div className="home-posts">

                <div className="home-latest-posts container-fluid">
                    <h1>latest posts</h1>
                </div>

                <div className="home-container container-fluid">
                    <div className="post-list"> <Posts posts={posts}/> </div>
                    <div className="post-sidebar"><Sidebar/></div>
                </div>

                <Pagination pages={pages} page={page} setPage={setPage}/>
            </div>

             
        </section>

        {/*<Sidebar/> 
        <Posts posts={posts}/>
        <Pagination pages={pages} page={page} setPage={setPage}/>   {/** 3dd elpages , w el current page , w set elPage 3shan lma ydoos y8yrha*/}
        </>
    )

}
export default PostsPage;