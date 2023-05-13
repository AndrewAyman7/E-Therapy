import {Link, useNavigate} from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./admin.css";
import { deletePost, getAllPosts } from "../../redux/api-calls/postsApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import swal from "sweetalert";


const PostsTable = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getAllPosts());
    },[]);

    const {posts} = useSelector(state=>state.post);

    const deleteHandler = (postId)=>{ 
        swal({
            title: "Are You Sure To Delete ?",
            icon: "warning",
            buttons: true
        }).then(clicked=>{
            if(clicked){
                //swal("post has been deleted" , {icon:"success"});
                dispatch(deletePost(postId));
                navigate("/admin-dashboard/posts-table"); 
            }
        })
    }

    //console.log(posts);
    return<>
    <section className="dashboard-container">
        <AdminSidebar/>

        <div className="admin-main container-fluid">
            <h1 className="table-header"> Posts</h1>
            <select className="form-control" value={"filter"}>
                <option value="Filter Posts By"> Filter Posts By </option>
                <option value=""> Most Recent </option>
                <option value=""> Most Reports </option>
                <option value=""> Most likes </option>
                <option value=""> Trending </option>
            </select>

            <table className="table table-dark mt-3">
            <thead>
                <tr>
                <th scope="col">User</th>
                <th scope="col">Title</th>
                <th scope="col">img</th>
                <th scope="col">Category</th>
                <th scope="col">user</th>
                <th scope="col">Operations</th>
                <th scope="col">Likes</th>
                </tr>
            </thead>
            <tbody>
                { posts.map((el , idx)=>(
                    <tr key={el._id}>
                        <th scope="row">{idx+1}</th>
                        <td> <Link to={`/posts/details/${el._id}`}> {el.title} </Link> </td>
                        {
                            el.image.url !== ""  ?
                            <img className="dash-user-img" src= {`http://localhost:9000/${el.image.url}`}/>  :
                            <i className="bi bi-card-image admin-dash-icon"></i>
                        }
                        
                        <td>{el.category}</td>
                        <td> <Link to={`/profile/${el.user._id}`}> {el.user.username} </Link> </td>
                        <Link className="btn btn-success" to={`/posts/details/${el._id}`}> view </Link>
                        <button type="button" className="btn btn-danger" onClick={()=>deleteHandler(el._id)}>Delete</button>
                        <td> {el.likes.length} </td>
                    </tr>
                ))}


            </tbody>
            </table>
        </div>
    </section>


    </>
}
export default PostsTable;