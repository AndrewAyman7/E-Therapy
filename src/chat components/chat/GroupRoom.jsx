import { useEffect, useRef, useState } from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import "./chat.css";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import AddFriendRoom from "./AddFriendRoom";

const GroupRoom = ({socket})=>{

    const {user} = useSelector(state => state.auth);
    const {friends} = useSelector(state=>state.friends);
    //const {friends} = useSelector(state=>state.friends);
    const navigate = useNavigate();

    const {onlineFriends} = useSelector(state=>state.friends);

    const [joinFriend,setJoinFriend] = useState(false);

    let {id} = useParams();
    let [mssgs,setMssgs] = useState([]);
    let [roomUsers, setRoomUsers] = useState([]);

    let [groupInfo, setGroupInfo] = useState({});

    let [authorized, setAuthorized] = useState(true);

    const getRoomMssgs = async(id)=>{
        try{
            const res = await axios.get(`http://localhost:9000/api/room/${id}` , { 
                headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
            });
            console.log(res);
            setMssgs(res.data.mssgs);
            setGroupInfo(res.data.groupInfo);
            setRoomUsers(res.data.groupInfo[0].users);
            console.log(res.data.groupInfo[0].users);
        }catch(err){
            if(err.response.status === 403){
                swal("You should Join Room First");
                setAuthorized(false);
                navigate("/rooms");
            }
            else if(err.response.status === 401){
                swal("You are not authorized, its a private Room");
                setAuthorized(false);
                navigate("/rooms");
            }
            else{
                console.log(err);
            }
        }

    }

    let receiver;
    let setReceiver = (rec)=>{ // lazem mn 5lal fun, 3shan el ID Mytktbsh fo2 la return jsx
        receiver=rec;
    }

    const postMssg = async()=>{
        if(mssg !==""){
            let fullMssg = {
                chat: id,
                content: mssg,
                sender: user.id,
                receiver : receiver
            }
            try{
                const res = await axios.post(`http://localhost:9000/api/chat/addgroupmssg` , fullMssg, { 
                    headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
                });
                socket.emit("sendRoomMssg" , fullMssg);
                setReloadNewMssg(new Date().toISOString()+fullMssg.content); // 3shan tb2a unique w el State tb2a gdeda koll mra
                setMssg(""); // 3shan afddy el input
                console.log(res);
            }catch(err){
                console.log(err);
            }
        }
    }

    const [mssg,setMssg] = useState("");
    const [reloadNewMssg,setReloadNewMssg] = useState(null); 
    const [notifiMssg,setNotifiMssg] = useState(null);       
    const [recNewMssg,setRecNewMssg] = useState(null);

    useEffect(()=>{
        getRoomMssgs(id); 
    } , [joinFriend]);

    useEffect(()=>{
        //dispatch(getFriends()); // msh h7tagha b2a 3hsan 3mltha fe el App 5las
        getRoomMssgs(id);
        socket.emit("joinChatRoom" , id)// iam here

        socket.on("newMssgNotifi" , (mssg)=>{  
            setNotifiMssg(new Date().toISOString()+mssg.content); 
        });
        socket.on("newRoomMssgNotifi" , (mssg)=>{
            setRecNewMssg( new Date().toISOString()+mssg.content );
        })
    }, [id, reloadNewMssg, notifiMssg,recNewMssg,socket,joinFriend]);


    const goToLastMssg = useRef(null);

    const leaveRoom = async(id)=>{
        await axios.delete(`http://localhost:9000/api/chat-group/${id}` , {
            headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
        });
    }

    const handleLeaveRoom = (id)=>{
        swal({
            title: "Do You Really want to Leave this Room ?",
            icon: "warning",
            buttons: true
        }).then(clicked=>{
            if(clicked){
                leaveRoom(id);
                navigate("/rooms")
            }
        })
    }

    useEffect(()=>{
        goToLastMssg.current?.scrollIntoView();
    },[id,reloadNewMssg,notifiMssg,mssgs,recNewMssg,socket]);


    return(
        <>
        {
            authorized?
            <div className="room-chat-container">
            <div className="room-chat-users">
            <h1 className="room-users-h"> Group Users </h1>
            {
                roomUsers?.map((el,idx)=>(
                    <div className={el._id===user.id? "ch-left-p-box ch-b-active" : "ch-left-p-box"  }  key={idx} onClick={()=>{ navigate(`/profile/${el._id}`); }}> 
                        <div className="ch-left-p-box-gr">
                            {
                                el.profileimg.url.startsWith("http") ?   // 3shan ana 3amel default photo lw md5lsh profileimg , btbtdy b http
                                <img className="dash-user-img" src= {el.profileimg.url}/> : 
                                <img className="dash-user-img" src= {`http://localhost:9000/${el.profileimg.url}`}/>
                            }
                            <div>
                                <p> {el.username} </p>
                                {
                                    groupInfo[0]?.creator === el._id ? <span className="admin-room-span">Admin</span> : <></>
                                }
                            </div>
                        </div>
                    </div>
                ))
            }

            <button 
                className="btn room-btn-mutual" 
                onClick={ ()=>{handleLeaveRoom(id)} }
            > leave room </button>

            <div className="add-friend-to-group">

            <button className="add-fr-room" onClick={()=>setJoinFriend(true)} > invite a friend </button>

            {
                joinFriend? <AddFriendRoom setJoinFriend={setJoinFriend} roomUsers={roomUsers} /> : <></>
            }
            
            </div>

        </div>

        <div className="chat-room-box"> 
                <div className="chat-header">
                    {
                     <h2 className="chat-room-h"> {groupInfo[0]?.groupName} </h2>
                    }
                    {/* mssgs.length !==0 ? <p> {mssgs[0].chat.users[0].username} </p> : <>user</> } {/* ha5od elFriend Info mn ay mssg mn elArray */}
                    { /** Lw mfeesh mssgs, haat elData bta3et elfriend mn elId bta3 elchat aw haga, sahla fe kza tare2a */}

                    { 
                        onlineFriends?.map(onF=>(  
                            onF.chatId === id ? 
                                <span className="mssg-nav-notifi3"> </span> 
                            : <></>
                        ))
                    }
                </div>

                <div className="chat-content">
               
                {
                    mssgs.length !==0 ? <>
                    
                        {
                            
                            mssgs.map(mssg=>(
                               <>
                                <div className="mssg-box">
                                    
                                    { mssg.sender._id === user.id ?
                                        <p className="sender-m">{mssg.content} <span className="date-mssg">  {new Date(mssg.timestamp).getHours() + ":"  + String(new Date(mssg.timestamp).getMinutes()).padStart(2, '0')} </span> </p>
                                        : <>
                                        <div className="receiver-g-m">  
                                            <span className="receiver-g-span"> {mssg.sender.username} </span>
                                            <p className="room-rec-m">{mssg.content}  </p> 
                                            <span className="date-mssg"> {new Date(mssg.timestamp).getHours() + ":"  + String(new Date(mssg.timestamp).getMinutes()).padStart(2, '0')} </span>
                                        </div>
                                     </>
                                    }
                                </div>
                               </>
                            ))
            
                        }
                       
                    </> : <h1 className="start-chat"> Start The Conversation </h1>
                }
               <div ref={goToLastMssg}/>

                </div>

                <div className="chat-form">
                    <div className="chat-form-textarea">
                        <textarea placeholder="Message" value={mssg} onChange={(e=>setMssg(e.target.value))} ></textarea>
                    </div>
                    <div className="chat-form-submit">
                        <button
                        className="btn btn-info"
                        onClick={()=>{
                            postMssg();
                        }}
                      > Send </button>
                    </div>
                </div>
            </div>
        </div> : <></>

        }
        
            
        </>
    )

}
export default GroupRoom;