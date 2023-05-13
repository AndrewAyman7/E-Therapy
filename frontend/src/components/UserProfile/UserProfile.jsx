import "./profile.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserProfileById, uploadProfilePhoto } from "../../redux/api-calls/profileApi";
import { toast, ToastContainer } from "react-toastify";
import PostItem from "../posts/PostItem"; 
import { deleteAccount, logOut } from "../../redux/api-calls/authApi";
import swal from "sweetalert";
import axios from "axios";

import { acceptFriendRequest, cancelRequest, deleteFriend, rejectFriendRequest, sendRequest } from "../../redux/api-calls/friendApi";
import {socket} from "../../socket";

const UserProfile = ()=>{

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let {id} = useParams();

    // Upload photo 
    const [file,setFile] = useState(null);

    const addPhoto = (e)=>{
        e.preventDefault();

        const formData = new FormData(); 
        formData.append("image" , file);
        
        dispatch(uploadProfilePhoto(formData));
    }

    const {profile} = useSelector(state=>state.profile);
    const {user} = useSelector(state=>state.auth);
    const {friends} = useSelector(state=>state.friends);

    // Chat - Friends
    const {notifiReqAccepted} = useSelector(state=>state.auth);
    const {sentReq} = useSelector(state=>state.profile); // for Redux RealTime , To re-render Component
    const {reqAccepted} = useSelector(state=>state.profile);
    const {friendDeleted} = useSelector(state=>state.profile);
    const {reqRejected} = useSelector(state=>state.profile);

    const joinRoomFun = async(id)=>{
        await axios.post(`http://localhost:9000/api/chat/join-chat/${id}` , {} , {
            headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
        });
    }
    const handleJoinRoomFun = (id)=>{
        joinRoomFun(id);
        navigate(`/room/${id}`);
    }

    const [rooms,setUserRooms] = useState([]);
    const getUserGroups = async(id)=>{
        if(user){
            const res = await axios.get(`http://localhost:9000/api/rooms/friend/${id}` ,{
                headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
            });
            console.log(res.data);
            setUserRooms(res.data);
        }
    }

    const [reqAcceptedProfile,setReqAcceptedProfile] = useState(null);

    const [chats,setChats] = useState([]);
    const getUserChats = async()=>{
        if(user){
            let chatsRes = await axios.get("http://localhost:9000/api/user-chats" , {
                headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
            });
            console.log(chatsRes.data);
            setChats(chatsRes.data)
        }
    }

    const [mutualFriends,setMutualFriends] = useState([]);
    const getMutualFriends = async()=>{
        if(user){
            let friendsRes = await axios.get(`http://localhost:9000/api/profile/mutual-friends/${id}` , {
                headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
            });
            console.log(friendsRes);
            setMutualFriends(friendsRes.data);
        }
    }

    useEffect(()=>{
        dispatch(getUserProfileById(id));
        getUserChats();
        getUserGroups(id);
        getMutualFriends();
        window.scrollTo(0,0);
        socket.on("acceptFReqNotifi" , (data)=>{
            //alert(`${data.name } Accepted your friend request, you are friends now`);
            setReqAcceptedProfile(data.name);
        })
        //console.log(profile)
        //console.log(user);
        /*socket.on("newFReq", (data)=>{
            alert("new f req");
        })*/
    } , [id,sentReq,reqAccepted,notifiReqAccepted,friendDeleted,reqRejected,dispatch,socket,reqAcceptedProfile]);



    const deleteAcc = (id)=>{ 
        swal({
            title: "Are You Sure To Delete Account ?",
            icon: "warning",
            buttons: true
        }).then(clicked=>{
            if(clicked){
                dispatch(deleteAccount(id));
                dispatch(logOut());
                navigate("/");
            }
        })
    }

    const deleteFHandler = (id)=>{ 
        swal({
            title: "Are You Sure To Delete Friend ?",
            icon: "warning",
            buttons: true
        }).then(clicked=>{
            if(clicked){
                dispatch(deleteFriend(id))
            }
        })
    }

    {/**  @ToDo -> upload photo cloudinary, and update profile  #43,45  */}

    return(
        <>
        <div className="profile-container">
        <ToastContainer position="top-center" theme="colored"/>

        <div className="profile-left">
            <div className="profile-header">
                <h1 className="profile-header-h"> {profile?.username} </h1>   {/** lazem if 3shan bya5od wa2t elawl 3o2bal maygeeb eluser */}
                {
                    profile?.profileimg?.url?.startsWith("http") ?   // 3shan ana 3amel default photo lw md5lsh profileimg , btbtdy b http
                    <img src= {  file? URL.createObjectURL(file) : profile? profile.profileimg.url : null }/> :  
                    <img src= { file? URL.createObjectURL(file) : profile? `http://localhost:9000/${profile.profileimg.url}` : null}/>
                }
                
                {
                    user?.id === profile?._id ? <>
                    <form className="upload-profile-form" onSubmit={addPhoto}>
                        <div className="form-group">
                            <input type="file" className="form-control"  onChange={ (e)=>setFile(e.target.files[0])}/>
                        </div>
                        <button type="submit" className="btn my-btn">upload photo</button>
                    </form>
                    </> : <></>
                }
                
            </div>

            <div className="profile-posts-reverse">
            {
                profile?.posts?.map(post=>(
                    <PostItem
                    post={post}
                    username={profile?.username}
                    userId = {profile?._id}
                    profileImg = {profile?.profileimg?.url}
                    />
                ))
            }
            </div>

            {
                profile?._id === user?.id || user?.admin ? <>
                    <button className="btn my-btn" onClick={ ()=>deleteAcc(profile._id)} >Delete account</button> <br/><br/><br/>
                </> : <></>
            }

            {/**  @ToDo -> update profile , delete profile and Style !!   #32 , #33  */}
            {/* Copy them from other Components, eaaasy */}
        </div>

        <div className="profile-right">
            {
                chats?.map(el=> el?.users[0]?.id === id ? 
                    <button className="chat-profile-btn" onClick={()=>{navigate(`/chat/${el._id}`)}}
                > Go To Chat </button> : <></>)
            }
            {/*
                friends?.map(el=> el.id ===id ? 
                <button className="chat-profile-btn" onClick={()=>{navigate(`/chat/${el.chatId}`)}}
                > Go To Chat </button> : <></>)
            */}

            { /* ---------- Buttons (friend operations) --------------- */ }
            {/* lma a5osh profile anyone */ }

            {
                (user && mutualFriends && id!==user.id)?
                <div className="mutual-friends">
                    <h3> Mutual Friends </h3>
                    {
                        mutualFriends.map((el,idx)=>(
                            <div className="mutual-friend-box" onClick={()=>{navigate(`/profile/${el.id}`)}} >
                                {
                                el?.image?.startsWith("http") ?   // 3shan ana 3amel default photo lw md5lsh profileimg , btbtdy b http
                                <img src= {el.image}/> :  
                                <img src= {`http://localhost:9000/${el.image}`} />
                                }
                                <h4> {el.username} </h4>
                            </div>
                        ))
                    }
            </div> : <></>

            }

            

            {
                user? 
                <div className="profile-right-rooms">
                    { profile?._id === user?.id ? <> <h3> Rooms </h3> </>  : <h3> Mutual Rooms </h3> }
                    
                    <div className="rooms-profile-container">
                        {
                            rooms?.map((room,idx)=>(
                                <div className="room-profile-box" key={idx} onClick={()=>{ navigate(`/room/${room._id}`) } } >
                                    <h3> {room.groupName} </h3>
                                </div>
                            ) )
                        }

                    </div>
                </div> : <></>
            } 
            
            
            <div className="profile-right-friends">
            {
                user? <> {
                    profile?._id === user?.id ? <> 
                         </>
                    : profile?.friends?.find( f=>f.id===user?.id ) ? <>
                        <button type="submit"
                                className="btn btn-danger"
                                onClick={ ()=>{  deleteFHandler(profile._id) } }
                            > delete friend </button></>
                    : profile?.friendRequests?.find( f=>f.id===user?.id ) ? <>
                        <button type="submit"
                                className="btn btn-info"
                                onClick={ ()=>{ dispatch(cancelRequest(profile._id)) } }
                            > Cancel Request </button></>
                    : profile?.sentRequests?.find( f=>f.id===user?.id ) ? <>
                        <button type="submit"
                                className="btn btn-info"
                                onClick={ ()=>{
                                    dispatch(acceptFriendRequest(profile));
                                    socket.emit("acceptFReq" , user, profile);

                                } } 
                            > Accept </button>
                        <button type="submit"
                                className="btn btn-info"
                                onClick={ ()=>{ dispatch(rejectFriendRequest(profile._id)) } }
                            > Reject </button>
                        </>    
                    : <><button type="submit"
                                className="btn btn-info" 
                                onClick={ ()=>{
                                    dispatch(sendRequest(profile));
                                    socket.emit("sendNewFReq" , user, profile);
                                } }
                            >Add Friend </button></>
                    } 
                </> 
                
                : <> </>
            }
            </div>

        </div>

        </div>
        </>
    ) 

}
export default UserProfile;
