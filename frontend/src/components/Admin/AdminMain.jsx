import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../redux/api-calls/categoryApi";
import { getPostsCount } from "../../redux/api-calls/postsApi";
import { getAvgAge, getUsersCount } from "../../redux/api-calls/profileApi";
import { fetchComments } from "../../redux/api-calls/commentsApi";
import axios from "axios";

const AdminMain = ()=>{
    const dispatch = useDispatch();
    const [reportsNum , setReportsNum] = useState(null);
    const [therapistsNum , setTherapistsNum] = useState(null);
    const [contactsNum , setContactsNum] = useState(null);
    const [roomsNum , setRoomsNum] = useState(null);
    const [privateRoomsNum , setPrivateRoomsNum] = useState(null);

    const getReports = async()=>{
        try{
            let reportsRes = await axios.get("http://localhost:9000/api/reports" , {
                headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
            });
            setReportsNum(reportsRes.data.length);
        }catch(err){
            console.log(err);
        }
    }
    const getTherapists = async ()=>{
        try{
            let thers = await axios.get(`http://localhost:9000/api/fetch-therapist` , {
                headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
            });
            setTherapistsNum(thers.data.length);
        }catch(err){
            console.log(err);
        }
    }     
    const getContacts = async()=>{
        try{
            let contactsRes = await axios.get("http://localhost:9000/api/contacts" , {
                headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
            });
            setContactsNum(contactsRes.data.length);
        }catch(err){
            console.log(err);
        }
    }
    const getPublicRooms = async()=>{
        try{
            let roomsRes = await axios.get("http://localhost:9000/api/rooms/count" , {
                headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
            });
            setRoomsNum(roomsRes.data);
        }catch(err){
            console.log(err);
        }
    }
    const getPrivateRooms = async()=>{
        try{
            let roomsRes = await axios.get("http://localhost:9000/api/private-rooms/count" , {
                headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
            });
            setPrivateRoomsNum(roomsRes.data);
        }catch(err){
            console.log(err);
        }
    }
    

    useEffect(()=>{
        dispatch(fetchCategories());    // de ely ht3ml set lel categories fe elRedux (state)
        dispatch(getUsersCount());
        dispatch(getPostsCount());
        dispatch(getAvgAge());
        dispatch(fetchComments());
        getReports();
        getTherapists();
        getContacts();
        getPublicRooms();
        getPrivateRooms();
    },[]);
    const {categories} = useSelector(state=>state.category);
    const {profilesCount} = useSelector(state=>state.profile);
    const {postsCount} = useSelector(state=>state.post);
    const {avgAge} = useSelector(state=>state.profile);
    const {comments} = useSelector(state=>state.comment);
    

    return(
        <>
        <section className="admin-main">
            <div className="dash-layer">
            <div className="one-row-admin">
                <div className="ad-box">
                    <p> users </p>
                    <p> {profilesCount} </p>
                    <div className="box-but-icons">
                        <Link to={"/admin-dashboard/users-table"} className="btn btn-info">  All Users  </Link>
                        <i class="bi bi-person"></i>
                    </div>
                </div>
                <div className="ad-box">
                    <p> posts </p>
                    <p> {postsCount} </p>
                    <div className="box-but-icons">
                        <Link to={"/admin-dashboard/posts-table"} className="btn btn-success">  All Posts  </Link>
                        <i class="bi bi-stickies"></i>
                    </div>
                </div>                                
                <div className="ad-box">
                    <p> categories </p>
                    <p> {categories.length}</p>
                    <div className="box-but-icons">
                        <Link to={"/admin-dashboard/category-table"} className="btn btn-success">  All Categories  </Link>
                        <i class="bi bi-tags"></i>
                    </div>
                </div>
                <div className="ad-box">
                    <p> comments </p>
                    <p> {comments.length } </p>
                    <div className="box-but-icons">
                        <Link to={"/admin-dashboard/comments-table"} className="btn btn-success">  All Comments  </Link>
                        <i class="bi bi-chat-left-text"></i>
                    </div>
                </div>
                <div className="ad-box">
                    <p> Reports</p>
                    <p> { reportsNum? reportsNum : <></> } </p>
                    <div className="box-but-icons">
                        <Link to={"/admin-dashboard/reports-table"} className="btn btn-danger">  All Reports  </Link>
                        <i class="bi bi-clipboard2-pulse"></i>
                    </div>
                </div>
                <div className="ad-box">
                    <p> Therapists </p>
                    <p> { therapistsNum? therapistsNum : <></> } </p>
                    <div className="box-but-icons">
                        <Link to={"/admin-dashboard/therapists-table"} className="btn btn-info">  All Therapists  </Link>
                        <i class="bi bi-person-heart"></i>
                    </div>
                </div>
                <div className="ad-box">
                    <p> Contacts </p>
                    <p> { contactsNum? contactsNum : <></> } </p>
                    <div className="box-but-icons">
                        <Link to={"/admin-dashboard/contacts-table"} className="btn btn-info">  All Contacts  </Link>
                        <i class="bi bi-envelope-at"></i>
                    </div>
                </div>
                <div className="ad-box">
                    <p> avg Age of our visitors </p>
                    <p> {avgAge} </p>
                    <div className="box-but-icons">
                        <Link to={"/admin-dashboard/users-table"} className="btn btn-warning">  All Users  </Link>
                        <i class="bi bi-bar-chart"></i>
                    </div>
                </div>
                <div className="ad-box">
                    <p> Public Rooms </p>
                    <p> { roomsNum? roomsNum : <></> } </p>
                    <div className="box-but-icons">
                        <i class="bi bi-bar-chart"></i>
                    </div>
                </div>
                <div className="ad-box">
                    <p> Private Rooms </p>
                    <p> { privateRoomsNum? privateRoomsNum : <></> } </p>
                    <div className="box-but-icons">
                        <i class="bi bi-bar-chart"></i>
                    </div>
                </div>
            </div>  

            <div className="admin-add"></div>  {/** @ToDo Add Category .. */}
            </div>
        </section>
        </>
    )

   /* <div className="admin-list-item"><Link to={""} > <i class="bi bi-person"></i>  Users </Link> </div>
    <div className="admin-list-item"><Link to={""} > <i class="bi bi-stickies"></i> Posts </Link> </div>
    <div className="admin-list-item"><Link to={""} > <i class="bi bi-tags"></i> Categories </Link> </div>
    <div className="admin-list-item"><Link to={""} > <i class="bi bi-chat-left-text"></i> Comments </Link> </div>*/
}
export default AdminMain;