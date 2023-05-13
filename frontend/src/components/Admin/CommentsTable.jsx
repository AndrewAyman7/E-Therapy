import {Link} from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./admin.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import swal from "sweetalert";
import { toast, ToastContainer } from "react-toastify"; 
import { deleteComment, fetchComments } from "../../redux/api-calls/commentsApi";

const CommentsTable = ()=>{
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchComments());
    },[]);
    const {comments} = useSelector(state=>state.comment);

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

    return<>
    <section className="dashboard-container">
    <ToastContainer position="top-center" theme="colored"/>  {/** 3shan lw 7sl error fe elpage de , Api byrod b response fe toast Alert */}

        <AdminSidebar/>

        <div className="admin-main container-fluid">
            <h1 className="table-header"> Comments {comments.length}</h1>
            <table className="table table-dark mt-3">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Comments</th>
                <th scope="col">User</th>
                <th scope="col">Operations</th>
                </tr>
            </thead>
            <tbody>
                { comments.map((el , idx)=>(
                    <tr key={el.id}>
                        <th scope="row">{idx+1}</th>
                        <td>{el.content}</td>
                        <td> <Link to={`/profile/${el.userId}`}> {el.username} </Link> </td>

                        <Link className="btn btn-success" to={`/posts/details/${el.postId}`} >View Post</Link>
                        <button type="button" className="btn btn-danger" onClick={()=>deleteHandler(el._id)}>Delete</button>
                    </tr>
                ))}


            </tbody>
            </table>
        </div>
    </section>


    </>
}
export default CommentsTable;