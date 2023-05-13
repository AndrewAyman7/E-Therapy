import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getFriends } from "../../redux/api-calls/friendsApi";
import "./friends.css";
//import { socket } from "../../socket";
import {Link} from "react-router-dom";
import { friendsActions } from "../../redux/slices/friendsSlice";
import { getAllUsers } from "../../redux/api-calls/profileApi";



const Friends = ({socket})=>{

    const dispatch = useDispatch();

    const [onlineF , setOnlineF] = useState(null);

    const {friends} = useSelector(state=>state.friends);
    const {profiles} = useSelector(state=>state.profile);
    const {user} = useSelector(state => state.auth);  


    const [offline,setOffline] = useState(null);
    const [online,setOnline] = useState(null); // Read below --
    // leh 3amel el id kda ? mn el (Backend socket)
    // -- mzwd 3leh el current data 3shan yb2a unique, 3shan lma a7oto fe elState fe elReact Component ,
    // kol mra yb2a b value gdeda, fa koll mra elState tb2a mo5tlfa, fa kol mra y7sl ReRender lel component = RealTime
    // 3shan lw et3ml el id bs, msh hyb2a unique , fa hyt3mlo set fe elState w hayfdl fe elState,
    // fa elState msh htt8yr, fa elComponent msh hy7slha ReRender
    // 100% By ME

    


    // eh lazma elRedux hena?  en ykoon m3aya el online friends fe koll el pages, bs lazem t7ott elCode fe el App Component
    const setOnlineFriendss = (friends)=>{
        return async (dispatch,getState)=>{
            try{
                dispatch(friendsActions.setOnlineFriends(friends)); // Redux , RealTime 
            }catch(err){
                console.log(err);
            }
        }
    }


    useEffect(()=>{  
        dispatch(getFriends());
        dispatch(getAllUsers());
    },[socket,dispatch]);

    useEffect(()=>{
        if(friends.length !==0){
            socket.emit("getOnlineFriends" , friends); // aw mmkn t3mlha b user.friends, ta5od elfriends mn el Redux User login
            socket.on("onlineUsers" , friends=>{
                //console.log(friends);
                setOnlineF(friends);
                //dispatch(friendsActions.setOnlineFriends(friends));
                dispatch(setOnlineFriendss(friends));
            });

            // RealTime Online & Offline   100% By ME 
            // 3shan koll ma 7d yb2a online ygeely 3lama 5adra in RealTime
            // w koll ma 7d y3ml offline , ygeely bardoo in RealTime
            // mn 8er ma a3ml refresh 7taaaaaa
            socket.on("offline" , (id)=>{
                setOffline(id);
                console.log("new user offline");
            });

            socket.on("newOneOnline" , (id)=>{
                setOnline(id);
                console.log(id)
                console.log("new user online");
            })
        }
      }, [friends,socket,dispatch,offline,online ]); // [onlineF]

      
      /*useEffect(()=>{
        socket.emit("getOnlineFriends" , friends);
        socket.on("onlineUsers" , friends=>{
            console.log(friends);
            setOnlineF(friends);
        })
      }, [friends, onlineF]); // kda Real Time Kamel , bs errors kteeeeeer, infinity Error (infinity socket events)
*/

    return(
        <>
 
        <section className="friends-page-container">
            <div className="my-friends">
                <h1 className="friends-page-h"> Friends </h1>
                <div className="one-row-admin">
                    {
                        friends?.map(el=>(
                            <div className="ad-box2" key={el.id}>
                                <div className="friend-isonline">
                                    {
                                        el.image.startsWith("http") ?   // 3shan ana 3amel default photo lw md5lsh profileimg , btbtdy b http
                                        <img className="dash-user-img" src= {el.image}/> : 
                                        <img className="dash-user-img" src= {`http://localhost:9000/${el.image}`}/>
                                    }

                                    { 
                                        onlineF?.map(onF=>(
                                            onF.id === el.id ? 
                                                <div className="box-but-icons2"> 
                                                    <i className="bi bi-dot"></i>
                                                </div>
                                            : <></>
                                    ))
                                    }
                                </div>
                                <p>  {el.username} </p>

                                <div className="friend-box-buts">
                                    <Link className="friend-box-but" to={`/chat/${el.chatId}`}> Chat </Link>
                                    <Link className="friend-box-but" to={`/profile/${el.id}`}> View Profile  </Link>
                                </div>

                            </div>
                        ))
                    }

                </div>
            </div>
              

            <div className="friends-sugg">
                <h1 className="friends-page-h"> Friends Suggestions </h1>
                <div className="one-row-admin">
                {
                    profiles?.map(el=>(
                        friends?.find(f=>f.id === el._id) ? <></> :
                        el._id !== user.id?
                        <div className="ad-box3" key={el.id}>
                            {
                                el.profileimg.url.startsWith("http") ?   // 3shan ana 3amel default photo lw md5lsh profileimg , btbtdy b http
                                <img className="dash-user-img" src= {el.profileimg.url}/> : 
                                <img className="dash-user-img" src= {`http://localhost:9000/${el.profileimg.url}`}/>
                            }
                            <p> {el.username} </p>
                            <Link className="friend-box-but" to={`/profile/${el.id}`}> View Profile </Link>
                        </div> : <></>
                    ))
                }

                {/*
                    friends?.length !== 0? 
                    profiles?.map(el=>(
                        friends?.find( fr=> fr?.id !== el?._id ) && el?._id !== user?.id ?
                        <div className="ad-box3" key={el.id}>
                            <p> <Link to={`/profile/${el.id}`}> {el.username}  </Link></p>
                            {
                                el.profileimg.url.startsWith("http") ?   // 3shan ana 3amel default photo lw md5lsh profileimg , btbtdy b http
                                <img className="dash-user-img" src= {el.profileimg.url}/> : 
                                <img className="dash-user-img" src= {`http://localhost:9000/${el.profileimg.url}`}/>
                            }
                            <Link className="btn btn-info" to={`/profile/${el.id}`}> View Profile </Link>
                        </div> : <></>
                    )) :
                    profiles?.map(el=>(   // 3shan lw eluser lesa new , m3ndhoosh friends, msh hy5osh elLoop
                        el.id !== user.id?
                        <div className="ad-box3" key={el.id}>
                            <p> <Link to={`/profile/${el.id}`}> {el.username}  </Link></p>
                            {
                                el.profileimg.url.startsWith("http") ?   // 3shan ana 3amel default photo lw md5lsh profileimg , btbtdy b http
                                <img className="dash-user-img" src= {el.profileimg.url}/> : 
                                <img className="dash-user-img" src= {`http://localhost:9000/${el.profileimg.url}`}/>
                            }
                            <Link className="btn btn-info" to={`/profile/${el.id}`}> View Profile </Link>
                        </div> : <></>
                    ))
                */}
                </div>
            </div>

        </section>
        </>
    ) 

}
export default Friends;