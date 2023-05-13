import { Link, useNavigate, useParams } from "react-router-dom";
import "./chat.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";


const ChatPageLeft = ({socket,chats})=>{

    const {friends} = useSelector(state=>state.friends);
    const {onlineFriends} = useSelector(state=>state.friends);

    let navigate = useNavigate();

    let {id} = useParams();


    return(
        <>

        <div className="create-group-but">
            <Link to={`/chat/create-group`} className="btn crete-g-but"> Create Group </Link>
        </div>
        {
            chats?.map((el,idx)=>(
                <div className={id===el._id? "ch-left-p-box ch-b-active" : "ch-left-p-box"  }  key={idx} onClick={()=>{ navigate(`/chat/${el._id}`); }}> 
                    <div className="ch-left-p-box-gr">
                        {
                            el.users[0].profileimg.url.startsWith("http") ?
                            <img className="dash-user-img" src= {el.users[0].profileimg.url}/> : 
                            <img className="dash-user-img" src= {`http://localhost:9000/${el.users[0].profileimg.url}`}/>
                        }
                        { 
                            onlineFriends?.map(onF=>(  
                                onF.id === el.users[0].id? 
                                    <span className="mssg-nav-notifi2"> </span> 
                                : <></>
                            ))
                        }
                        <p> {el.users[0].username} </p>
                    </div>
                </div>
            ))
        }
        {/*
            friends?.map(el=>(
                <div className={id===el.chatId? "ch-left-p-box ch-b-active" : "ch-left-p-box"  }  key={el.id} onClick={()=>{ navigate(`/chat/${el.chatId}`); }}> 
                    <div className="ch-left-p-box-gr">
                        {
                            el.image.startsWith("http") ?   // 3shan ana 3amel default photo lw md5lsh profileimg , btbtdy b http
                            <img className="dash-user-img" src= {el.image}/> : 
                            <img className="dash-user-img" src= {`http://localhost:9000/${el.image}`}/>
                        }
                        { 
                            onlineFriends?.map(onF=>(  
                                onF.id === el.id ? 
                                    <span className="mssg-nav-notifi2"> </span> 
                                : <></>
                            ))
                        }
                        <p> {el.username} </p>
                    </div>
                </div>
            ))
        */}

                                          

        </>
    )

}
export default ChatPageLeft;