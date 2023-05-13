import { useDispatch, useSelector } from "react-redux";
import {Link, Navigate, useNavigate} from "react-router-dom";
import { hiddenReloadForNewRequests, logOut } from "../../redux/api-calls/authApi";
import "./header.css";
import { useEffect, useState } from "react";

const Navbar = ({socket})=>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector(state => state.auth);  // state.auth.user
    const {friendRequests} = useSelector(state=> state.auth);
    const {friends} = useSelector(state=>state.friends);

    const [newReq , setNewReq] = useState(null);
    const [notifiBox, setNotifiBox] = useState(false);

    const [notifiMssg,setNotifiMssg] = useState(null);      

    //console.log(user?.profileimg);

    useEffect(()=>{
        if(user){  // for errors , 3shan lma yd5ol w hwa msh online, hygblo error , Redux -> no auth user state
            dispatch(hiddenReloadForNewRequests());
        }
    }, [friendRequests,newReq,socket]);



    useEffect(()=>{    // a7san mkan lel notifi , 3shan awl ma yft7 y3ml listen lel event da mra 1 bs, w awl ma y7sl yt3ml
        socket.on("newFReq", (data)=>{
            //alert("new f req");
            setNewReq({name: data.name , id: data.id});
            //console.log(data);
            setNotifiBox(true);
        });
    },[notifiMssg,socket,newReq]);

    const logOutFun = ()=>{
        navigate("/");
        dispatch(logOut());
        socket.disconnect(user.id);
    }

    useEffect(()=>{
        socket.on("newMssgNotifi" , (mssg)=>{ 
            if(mssg.sender !== user.id){
                setNotifiMssg(new Date().toISOString()+mssg.content);
            }
        });
    }, [notifiMssg,socket]);


    return<>

        <nav className="navbar navbar-expand-lg navbar-light myNav ">
            <div className="logo">
                <Link className="navbar-brand my-brand" to="/therapy">TherabyCorner</Link >
            </div>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div className="links collapse navbar-collapse" id="navbarSupportedContent">
                <div>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link >
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/posts">Posts</Link >
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/posts/create-post">Create-Post</Link >
                    </li>
                    { user?.admin? <>
                            <li className="nav-item">
                            <Link className="nav-link" to="/admin-dashboard">Admin Dashboard</Link >
                            </li>
                        </> : <></>
                    }
                    {
                        user? <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/friends">Friends</Link >
                            </li>
                        </> : <></>
                    }

                    <li className="nav-item">
                        <Link className="nav-link" to="/contact-us">Contact-Us</Link >
                    </li>

                </ul>
                </div>
                
            <div className="friend-chat-nav">
            {
                user? <>
                        <div className="btn-group">
                            <i
                            className= {notifiBox? "bi bi-people mssg-nav-icon" : "bi bi-people mssg-nav-icon"}
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            onClick={ ()=>{ dispatch(hiddenReloadForNewRequests()); } }
                            //className= { notifiBox? "btn btn-danger" : "btn btn-info"}
                            >
                                {
                                    user?.friendRequests.length>0? <span className="fr-r-notifi-nav"> {user?.friendRequests?.length} </span> : <></>
                                }
                            </i>

                            <div className="dropdown-menu">
                                <span className="dr-do-p"> Friend Requests </span>
                                {
                                    user?.friendRequests?.map(el=>(
                                        <a key={el.id}  className="dropdown-item" href={`/profile/${el.id}`}> {el.username}</a>
                                    ))
                                }
                                {
                                    newReq? <a className="dropdown-item" href={`/profile/${newReq.id}`}> {newReq.name}</a> : <></>
                                }
                            </div>
                        </div>
                </> : <></>
            }

            {/** Messanger Notifi */}

            {
                user?
                <>
                <div className="btn-group mssg-nav-icon-box">
                    <i type="button" className="bi bi-chat mssg-nav-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    </i>
                    {notifiMssg? <span className="mssg-nav-notifi"> </span> : <></>}
                    <div className="dropdown-menu">
                        {
                            friends?.map(el=>(
                                <a className="dropdown-item" href={`/chat/${el.chatId}`} key={el.id} >{el.username}</a>
                            ))
                        }
                    </div>
                </div>

            <div className="rooms-nav">
                <Link className="rooms-nav-a" to={"/rooms"}> Rooms </Link> 
            </div> </> 
            : <></>
            }
            
            </div>


            { user? <>
                    <div className="user-nav-data">
                        {
                            user?.profileimg?.url?.startsWith("http") ?   // 3shan ana 3amel default photo lw md5lsh profileimg , btbtdy b http
                            <img className="dash-user-img" src= {user.profileimg.url}/> : 
                            <img className="dash-user-img" src= {`http://localhost:9000/${user.profileimg.url}`}/>
                        }
                        <Link className="nav-link" to={`/profile/${user.id}`}>{user.username} </Link > {/** 7ott hena b2a sora eluser ely 3ml login */} 
                        <button className="btn logout-btn" onClick={()=>{logOutFun()}}>Logout</button>
                    </div>
                    </> :   
                            <div className="btns"  >
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to={"/register"} type="button" className="btn my-btn">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/login"} type="button" className="btn my-btn">Login</Link>
                                </li>
                            </ul>
                        </div> 
            }

    </div>

        </nav>
    </>

}

export default Navbar