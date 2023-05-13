import { useEffect, useRef, useState } from "react";
import { Link,useParams } from "react-router-dom";
import axios from "axios";
import "./chat.css";
import { useDispatch, useSelector } from "react-redux";
//import ScrollToBottom from 'react-scroll-to-bottom';
import { getFriends } from "../../redux/api-calls/friendsApi";



const ChatPageRight = ({socket,chats})=>{

    const {user} = useSelector(state => state.auth);
    const {friends} = useSelector(state=>state.friends);

    const {onlineFriends} = useSelector(state=>state.friends);

    let {id} = useParams();
    let [mssgs,setMssgs] = useState([]);
    let [authorized , setAuthorized] = useState(true);
    

    const [mssg,setMssg] = useState("");
    const [reloadNewMssg,setReloadNewMssg] = useState(null); // (1) 3shan lma ab3t rsala y3ml reload 3ndy
    const [notifiMssg,setNotifiMssg] = useState(null);       // (2) 3shan lma ygely mssg, y3ml reload w ygbha

    let receiver;
    let setReceiver = (rec)=>{ // lazem mn 5lal fun, 3shan el ID Mytktbsh fo2 la return jsx
        receiver=rec;
    }

    const getMssgs = async(id)=>{
        try{
            const res = await axios.get(`http://localhost:9000/api/chat/${id}` , { 
            headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
            });
            setMssgs(res.data);
        }catch(err){
            setAuthorized(false); // Better for delay
            console.log(err);
        }
        
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
                const res = await axios.post(`http://localhost:9000/api/chat/addmssg` , fullMssg, { 
                    headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
                });
                socket.emit("sendMssg" , fullMssg);
                setReloadNewMssg(new Date().toISOString()+fullMssg.content); // 3shan tb2a unique w el State tb2a gdeda koll mra
                setMssg(""); // 3shan afddy el input
                console.log(res);
            }catch(err){
                console.log(err);
            }
        }
    }

    useEffect(()=>{
        getMssgs(id); 
    } , []);

    useEffect(()=>{
        //dispatch(getFriends()); // msh h7tagha b2a 3hsan 3mltha fe el App 5las
        getMssgs(id);
        console.log(mssgs);
        socket.emit("joinChatRoom" , id)// iam here

        socket.on("newMssgNotifi" , (mssg)=>{
            setNotifiMssg(new Date().toISOString()+mssg.content);
        }); 
    }, [id, reloadNewMssg, notifiMssg,socket,axios]);

    // Note: you can write socket.emit("" , (data) , { CB fun })

    const goToLastMssg = useRef(null);

    useEffect(()=>{
        goToLastMssg.current?.scrollIntoView();
    },[id,reloadNewMssg,notifiMssg,mssgs,socket,axios])

    let convertDate = (dateT)=>{
        let date = new Date(dateT);
        return date;
    }


    let chatName = {};

    return(
        <>
        {
            authorized? 
            <div className="chat-box"> 
                <div className="chat-header">
                    <div className="chat-header-name">
                    {
                        chats?
                        chats?.map(ch=>(
                            ch._id === id ?<> {setReceiver(ch.users[0].id)} <Link to={`/profile/${ch.users[0].id}`}><p> {ch.users[0].username} </p></Link> </> : <></>
                        )) : <></>
                    }
                    {/*
                        friends?
                        friends?.map(fr=>(
                            fr.chatId === id ?<> {setReceiver(fr.id)} <Link to={`/profile/${fr.id}`}><p> {fr.username} </p></Link> </> : <></>
                        )) : <></>
                    */}
                    </div>
                    { /*
                        mssgs.length !==0 ? <>
                        {
                            mssgs[0].chat.users.map((userr,idx)=>( // ana m5zn el users fe koll mssg, fa ha5odhom mn awl rsala w 5las
                                userr._id !== user.id? <Link to={`/profile/${userr._id}`}><p> {mssgs[0].chat.users[idx].username} </p></Link> : <></> 
                            ))
                        }
                        </> : <>user</> // awl ma yktb awl mssg, koloo hayzhrr
                    */
                    }
                    {/* mssgs.length !==0 ? <p> {mssgs[0].chat.users[0].username} </p> : <>user</> } {/* ha5od elFriend Info mn ay mssg mn elArray */}
                    { /** Lw mfeesh mssgs, haat elData bta3et elfriend mn elId bta3 elchat aw haga, sahla fe kza tare2a */}

                    <div className="chat-header-online">
                    { 
                        onlineFriends?.map(onF=>(  
                            onF.chatId === id ? 
                                <span className="mssg-nav-notifi3"> </span> 
                            : <></>
                        ))
                    }
                    </div>
                </div>

                <div className="chat-content">
                {
                    mssgs.length !==0 ? <>
                    
                        {
                            
                            mssgs.map(mssg=>(
                               <>
                                <div className="mssg-box"> 
                                    {mssg.sender === user.id ?
                                    <p className="sender-m">{mssg.content} <span className="date-mssg">  {new Date(mssg.timestamp).getHours() + ":"  + String(new Date(mssg.timestamp).getMinutes()).padStart(2, '0')} </span> </p> 
                                    : <p className="receiver-m">{mssg.content} <span className="date-mssg"> {new Date(mssg.timestamp).getHours() + ":"  + String(new Date(mssg.timestamp).getMinutes()).padStart(2, '0') } </span> </p>}
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
                            // put Condition here , if empty content, refuse.. , shhof elVideo el 59_min (elAgnby) 3amlha
                            
                            postMssg();
                            
                        }}
                      > Send </button>
                    </div>
                </div>
            </div> : <> <p className="not-his-chat"> 403 Forbidden - Sorry, You Are Not Allowed To Acces Chat Doesn't Belong To You</p> </>
        }
            
        </>
    )

}
export default ChatPageRight;






/** Last Version 

import { useEffect, useRef, useState } from "react";
import { Link,useParams } from "react-router-dom";
import axios from "axios";
import "./chat.css";
import { useDispatch, useSelector } from "react-redux";
//import ScrollToBottom from 'react-scroll-to-bottom';
import { getFriends } from "../../redux/api-calls/friendsApi";



const ChatPageRight = ({socket})=>{

    const {user} = useSelector(state => state.auth);
    const {friends} = useSelector(state=>state.friends);

    const {onlineFriends} = useSelector(state=>state.friends);

    let {id} = useParams();
    let [mssgs,setMssgs] = useState([]);
    let [authorized , setAuthorized] = useState(true);
    const getMssgs = async(id)=>{
        try{
            const res = await axios.get(`http://localhost:9000/api/chat/${id}` , { 
            headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
            });
            setMssgs(res.data);
        }catch(err){
            setAuthorized(false); // Better for delay
            console.log(err);
        }
        
    }

    const postMssg = async(mssg)=>{
        if(mssg.content !==""){
            try{
                const res = await axios.post(`http://localhost:9000/api/chat/addmssg` , mssg, { 
                    headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
                });
                console.log(res);
            }catch(err){
                console.log(err);
            }
        }
    }

    const [mssg,setMssg] = useState("");
    const [reloadNewMssg,setReloadNewMssg] = useState(null); // (1) 3shan lma ab3t rsala y3ml reload 3ndy
    const [notifiMssg,setNotifiMssg] = useState(null);       // (2) 3shan lma ygely mssg, y3ml reload w ygbha

    let receiver;
    let setReceiver = (rec)=>{ // lazem mn 5lal fun, 3shan el ID Mytktbsh fo2 la return jsx
        receiver=rec;
    }

    useEffect(()=>{
        getMssgs(id); 
    } , []);

    useEffect(()=>{
        //dispatch(getFriends()); // msh h7tagha b2a 3hsan 3mltha fe el App 5las
        getMssgs(id);
        socket.emit("joinChatRoom" , id)// iam here

        socket.on("newMssgNotifi" , (mssg)=>{
            setNotifiMssg(new Date().toISOString()+mssg.content);
        }); 
    }, [id, reloadNewMssg, notifiMssg,socket,axios]);

    // Note: you can write socket.emit("" , (data) , { CB fun })

    const goToLastMssg = useRef(null);

    useEffect(()=>{
        goToLastMssg.current?.scrollIntoView();
    },[id,reloadNewMssg,notifiMssg,mssgs,socket,axios])


    let chatName = {};

    return(
        <>
        {
            authorized? 
            <div className="chat-box"> 
                <div className="chat-header">

                    {
                        friends?
                        friends?.map(fr=>(
                            fr.chatId === id ?<> {setReceiver(fr.id)} <Link to={`/profile/${fr.id}`}><p> {fr.username} </p></Link> </> : <></>
                        )) : <></>
                    }
                    { /*
                        mssgs.length !==0 ? <>
                        {
                            mssgs[0].chat.users.map((userr,idx)=>( // ana m5zn el users fe koll mssg, fa ha5odhom mn awl rsala w 5las
                                userr._id !== user.id? <Link to={`/profile/${userr._id}`}><p> {mssgs[0].chat.users[idx].username} </p></Link> : <></> 
                            ))
                        }
                        </> : <>user</> // awl ma yktb awl mssg, koloo hayzhrr
                    */
                    //} 
                   // {/* mssgs.length !==0 ? <p> {mssgs[0].chat.users[0].username} </p> : <>user</> } {/* ha5od elFriend Info mn ay mssg mn elArray */}
                   // { /** Lw mfeesh mssgs, haat elData bta3et elfriend mn elId bta3 elchat aw haga, sahla fe kza tare2a */}

                  /*  { 
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
                                    {mssg.sender === user.id ? <p className="sender-m">{mssg.content}</p> : <p className="receiver-m">{mssg.content}</p>}
                                </div>
                               </>
                            ))
            
                        }
                       
                    </> : <>Start The Chat</>
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
                            // put Condition here , if empty content, refuse.. , shhof elVideo el 59_min (elAgnby) 3amlha
                            let fullMssg = {
                                chat: id,
                                content: mssg,
                                sender: user.id,
                                receiver : receiver
                            }
                            console.log(fullMssg);
                            postMssg(fullMssg);
                            socket.emit("sendMssg" , fullMssg);

                            setReloadNewMssg(new Date().toISOString()+fullMssg.content); // 3shan tb2a unique w el State tb2a gdeda koll mra
                            setMssg(""); // 3shan afddy el input
                        }}
                      > Send </button>
                    </div>
                </div>
            </div> : <> <p className="not-his-chat"> 403 Forbidden - Sorry, You Are Not Allowed To Acces Chat Doesn't Belong To You</p> </>
        }
            
        </>
    )

}
export default ChatPageRight; */