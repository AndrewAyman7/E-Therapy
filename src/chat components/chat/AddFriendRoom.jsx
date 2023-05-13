import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/api-calls/categoryApi";
import axios from "axios";

const AddFriendRoom = ({setJoinFriend, roomUsers})=>{ 
    console.log(roomUsers)

    const {friends} = useSelector(state=>state.friends);
    let {id} = useParams();

    const [checkedUsers, setCheckedUsers] = useState([]);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const AddFriendToRoom = async(data)=>{
        console.log(data);
        const res = axios.post(`http://localhost:9000/api/chat/add-friends/${id}` , data , {
            headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
        });
        console.log(res);
    }

    const handleCheck = (event) => {
        var updatedList = [...checkedUsers];
        if (event.target.checked) {
          updatedList = [...checkedUsers, event.target.value];
        } else {
          updatedList.splice(checkedUsers.indexOf(event.target.value), 1);
        }
        setCheckedUsers(updatedList);
      };
    
    useEffect(()=>{
        dispatch(fetchCategories());
    },[]);

    const updateForm = (e)=>{
        e.preventDefault();

        if(checkedUsers.length>0){
            AddFriendToRoom(checkedUsers);
        }

        setJoinFriend(false);
    }
    
    return(
        <>
        <div className="join-friend-box-layer">
        <div className="join-friend-box">
            <div className="close-form">
                <i class="bi bi-x-circle"  onClick={()=>{setJoinFriend(false)}}></i>
            </div>   
            <div className="post-update-form">
            <ToastContainer position="top-center" theme="colored"/>

                <h3 className="text-center">Invite Friend To Join Room</h3>
                <form className="m-3"  onSubmit={updateForm}>  {/** Golden Note : onSubmit, not onClick */}
                    <div className="form-group">

                        {
                            friends?.map((item,idx)=>( <>
                                <div class="form-check form-check-inline" key={idx}>
                                    {
                                        roomUsers.find(u=> u.id === item.id) ? (<>
                                            <input class="form-check-input join-fr-label" type="checkbox" value={item.id} onChange={handleCheck} disabled/>
                                            <label class="form-check-label">{item.username}</label>
                                        </>) : <>
                                            <input class="form-check-input join-fr-label" type="checkbox" value={item.id} onChange={handleCheck}/>
                                            <label class="form-check-label">{item.username}</label> 
                                        </>
            
                                    }
                                </div> <br/> 
                            </> ))
                        }
                    </div>
                    <button type="submit" className="btn my-btn2" >Add</button>
                </form>
            </div>

        </div>
        </div>
        </>
    )

}
export default AddFriendRoom;