import { useEffect, useState } from "react";
import "./chat.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert";

const Groups = ({socket})=>{

    const navigate = useNavigate(); 
    const {user} = useSelector(state => state.auth);

    const [rooms, setRooms] = useState([]);
    const [searchedRooms , setSearchedRooms] = useState([]);

    const [leaved,setLeaved] = useState(false);

    const getGroups = async()=>{
        const res = await axios.get(`http://localhost:9000/api/rooms`);
        console.log(res.data);
        setRooms(res.data);
    }

    const joinRoomFun = async(id)=>{
        await axios.post(`http://localhost:9000/api/chat/join-chat/${id}` , {} , {
            headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
        });
    }

    const leaveRoom = async(id)=>{
        await axios.delete(`http://localhost:9000/api/chat-group/${id}` , {
            headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
        });
    }

    const handleJoinRoomFun = (id)=>{
        swal({
            title: "Do You Really want to Join this Room ?",
            icon: "info",
            buttons: true
        }).then(clicked=>{
            if(clicked){
                joinRoomFun(id);
                navigate(`/room/${id}`);
            }
        })
    }
    const handleLeaveRoom = (id)=>{
        swal({
            title: "Do You Really want to Leave this Room ?",
            icon: "warning",
            buttons: true
        }).then(clicked=>{
            if(clicked){
                leaveRoom(id);
                setLeaved(true);            
            }
        })
    }

    const searchRoomFun = (searchValue)=>{
        let tmpArr = rooms.filter(room=>room.groupName.toLowerCase().includes(searchValue.toLowerCase()));
        setSearchedRooms( tmpArr );
    }


    useEffect(()=>{
        getGroups();
    },[leaved])

    return(

        <>
        <div className="rooms-page-container">

        <div className="create-room-but">
            <Link to={`/chat/create-group`} className="btn crete-r-but"> Create Group </Link>
        </div>

        <div className="search-room">
        <i class="bi bi-search"></i>
            <input  type="text"
                    placeholder="search a room"
                    onKeyUp={(e)=>{searchRoomFun(e.target.value)}}
                    //onKeyUp={ ()=>{ searchRoomFun(searchValue) } }
            />
        </div>

        <div className="rooms-container">

        {
            searchedRooms.length!==0 ? (
                searchedRooms?.map((room,idx)=>(
                    <div className="room-box" key={idx}>
                        <div className="room-box-header">
                            <h2> {room.groupName} </h2>
                        </div>
                        <div className="room-box-content">
                        {
                            room.users.find(el=> el._id === user.id) ? <> 
                                <p className="alert-joined-room"> You Are Already Joined </p>
                                <button 
                                className="btn room-btn-mutual"
                                onClick={ ()=>{handleLeaveRoom(room._id)} }
                                > leave room </button>
                                <Link to={`/room/${room._id}`} className="btn room-btn-mutual"> Enter Room </Link>
                            </>: <>
                                <p className="join-hint"> You Can Join Us Now <br/> Get Help <br/> or Help Others </p>
                                <button
                                className="btn room-btn-mutual join-room-but"
                                onClick={()=>{handleJoinRoomFun(room._id)}}
                                > Join Room </button>
                            </>
                        } 
                        </div>
                    </div>
                ) ) 
            ):
            rooms?.map((room,idx)=>(
                <div className="room-box" key={idx}>
                    <div className="room-box-header">
                        <h2> {room.groupName} </h2>
                    </div>
                    <div className="room-box-content">
                    {
                        room.users.find(el=> el._id === user.id) ? <> 
                            <p className="alert-joined-room"> You Are Already Joined </p>
                            <button 
                            className="btn room-btn-mutual" 
                            onClick={ ()=>{handleLeaveRoom(room._id)} }
                            > leave room </button>
                            <Link to={`/room/${room._id}`} className="btn room-btn-mutual"> Enter Room </Link>
                        </>: <>
                            <p className="join-hint"> You Can Join Us Now <br/> Get Help <br/> or Help Others </p>
                            <button
                            className="btn room-btn-mutual join-room-but"
                            onClick={()=>{handleJoinRoomFun(room._id)}}
                            > Join Room </button>
                        </>
                    } 
                    </div>
                </div>
            ) )
        }

        </div>

        
        </div>
        </>

)
}

export default Groups;