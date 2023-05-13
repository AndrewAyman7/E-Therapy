import Header from "./components/header/Header";
import {Routes, Route , Navigate}  from "react-router-dom";
import Home from "./components/home/Home";
import Posts from "./components/posts/Posts";
import PostsPage from "./components/posts/PostsPage";
import Footer from "./components/footer/Footer";
import CreatePost from "./components/posts/CreatePost";
import PostDetails from "./components/posts/PostDetails";
import CategoryPosts from "./components/category/CategoryPosts";
import UserProfile from "./components/UserProfile/UserProfile";
import AdminDashboard from "./components/Admin/AdminDashboard";
import CommentsTable from "./components/Admin/CommentsTable";
import PostsTable from "./components/Admin/PostsTable";
import CategoryTable from "./components/Admin/CategoryTable";
import UsersTable from "./components/Admin/UsersTable";
import Register from "./components/forms/Register";
import Login from "./components/forms/Login";
import ForgotPass from "./components/forms/ForgotPass";
import NotFound from "./components/not found/NotFound";

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable'; // To Open React App On Edge Browser

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';

//Chat
import {socket} from "./socket";
import Friends from "./chat components/friends/Friends";
import Chat from "./chat components/chat/Chat";
import { getFriends } from "./redux/api-calls/friendsApi";
import CreateChatGroup from "./chat components/chat/CreateChatGroup";
import Groups from "./chat components/chat/Groups";
import GroupRoom from "./chat components/chat/GroupRoom";
import QuizMain from "./quiz components/QuizMain";
import TherapyMain from "./therapy components/TherapyMain";
import CategoryPage from "./components/category/CategoryPage";
import TherapistTable from "./components/Admin/TherapistTable";
import TherapistPage from "./components/therapists/TherapistPage";
import TherapistProfile from "./components/therapists/TherapistProfile";
import swal from "sweetalert";
import ReportsTable from "./components/Admin/ReportsTable";
import ContactUs from "./components/contactUs/ContactUs";
import ContactsTable from "./components/Admin/ContactsTable";


const  App = ()=> {

  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);  // state.auth.user
  const {friends} = useSelector(state=>state.friends);
  const [notifiMssg,setNotifiMssg] = useState(null);
  
  useEffect(()=>{
    dispatch(getFriends());
    console.log(user);
    socket.on("connect" , ()=>{
      console.log("you connected to server" , user?.id);
      socket.emit("joinMeInNotifiRoom" , user?.id);
      socket.emit("goOnline" , (user?.id));
      // Note: you can write socket.emit("" , (data) , { CB fun })

      socket.on("acceptFReqNotifi" , (data)=>{
        swal(`${data.name } Accepted your friend request, you are friends now`);

      })
      socket.on("newMssgNotifi" , (mssg)=>{ 
        if(mssg.sender !== user.id){
            setNotifiMssg(new Date().toISOString()+mssg.content);
        }
      })
      
    });
  }, [user]);

  return <>
      <Header socket={socket}/>
      <Routes>
        <Route path="/" element={ <TherapyMain socket={socket}/> } />
        <Route path="/profile/:id" element={ <UserProfile/> } />
        <Route path="/profile" element={ <Navigate to={`/profile/${user?.id}`} /> } /> {/** new, 3shan lw ktb /profile bs */}

        <Route path="posts">    {/*   equal => path="/posts/" , bt7ot slash abl w b3d   */}
          <Route index element={ <PostsPage/> } />  {/* index => y3ni el path elParent */}
          <Route path="create-post" element={ user? <CreatePost/> : <Navigate to="/login"/> } />
          <Route path="details/:id" element={<PostDetails/>} />
          <Route path="category/:category" element={ <CategoryPosts/> } />
        </Route>

        <Route path="admin-dashboard">
          <Route index element =                { user?.admin? <AdminDashboard/> : <Navigate to="/"/> } />  // Lw Admin w 3amel login
          <Route path="users-table" element=    { user?.admin? <UsersTable/> : <Navigate to="/"/> } />
          <Route path="comments-table" element= { user?.admin? <CommentsTable/>: <Navigate to="/"/>  } />
          <Route path="posts-table" element=    { user?.admin? <PostsTable/> : <Navigate to="/"/> } />
          <Route path="category-table" element= { user?.admin? <CategoryTable/> : <Navigate to="/"/> } />
          <Route path="therapists-table" element= { user?.admin? <TherapistTable/> : <Navigate to="/"/> } />
          <Route path="reports-table" element= { user?.admin? <ReportsTable /> : <Navigate to="/"/> } />
          <Route path="contacts-table" element= { user?.admin? <ContactsTable/> : <Navigate to="/"/> } />
        </Route>

        <Route path="/register" element={ !user? <Register/> : <Navigate to="/"/> } />
        <Route path="/login" element={ !user? <Login/> : <Navigate to="/"/> } />
        <Route path="/forgot-password" element={<ForgotPass/>} />


        {/** Chat Routes */}
        <Route path="/friends" element = { <Friends socket={socket}/> } />
        
        <Route path="/chat/:id" element = { !user? <Login/> : <Chat socket={socket}/> } /> 
        
        <Route path="/chat/create-group" element = { !user? <Login/> : <CreateChatGroup/> } /> 
        <Route path="/rooms" element={ !user? <Login/> : <Groups/>} />
        <Route path="/room/:id" element={ <GroupRoom socket={socket}/>}  />

        <Route path="/quiz" element={ <QuizMain/> } />

        <Route path="/therapy" element={ <TherapyMain socket={socket}/> } />

        <Route path="/classifications" element={ <CategoryPage/> } />

        <Route path="/therapists" element={ <TherapistPage/> } />

        <Route path="/therapist/profile/:id" element={ <TherapistProfile/> } />

        <Route path="/contact-us" element={ !user? <Login/> :  <ContactUs/> } />

        <Route path="*" element={<NotFound/>} />  {/** Lazem a5er Route */}
      </Routes>
      <Footer/>
      </>

}

export default App;
