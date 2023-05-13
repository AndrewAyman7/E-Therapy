const router = require("express").Router();
const signUp = require("./controllers/authController").signUp;
const login = require("./controllers/authController").login;
const validation = require("./validation/joiValidation");
const signUpSchema = require("./validation/validSchema").signUpSchema;
const loginSchema = require("./validation/validSchema").loginSchema;
const updateSchema = require("./validation/validSchema").updateSchema;
const getUsers = require("./controllers/usersController").getUsers;
const getUserById = require("./controllers/usersController").getUserById;
const updateUser = require("./controllers/usersController").updateUser;
const countUsers = require("./controllers/usersController").countUsers;
const {getUserProfileById, getFriendRequests, getFriends, getAvgAge, getTherapists, rateTherapist, getTherapistRates, getTherapistById, getMutualFriends} = require("./controllers/usersController");

const {  isAdmin , isUser ,  isAdminOrUserHimself , userFriend, protectChat, protectChatAddMssg } = require("./controllers/guardController");
const { deleteUser } = require("./controllers/usersController");
const { addPost, getPosts, getPostById, countPosts, deletePost, updatePost, toggleLike, updatePostWithImg, addPostNoImg, getPostLikes } = require("./controllers/postController");
const { postSchema, updatePostSchema, commentSchema, updateCommentSchema, categorySchema } = require("./validation/validSchema");
const { addComment, getAllComments, getUserComments, deleteComment, updateComment, getPostComments } = require("./controllers/commentsController");
const { addCategory, getCategories } = require("./controllers/categoryController");

// Chat
const { sendFriendRequest, cancelFriendRequest, acceptFriendRequest, deleteFriend, rejectFriendRequest } = require("./controllers/friendController");
const { getChatMssgs, postMssg, createChatGroup, joinChatGroup, getPublicGroups, postGroupMssg, getRoomMssgs, getUserRooms, getMutualRooms, roomsCount, privateRoomsCount, leaveChatGroup, getUserChats, getRoomByName, addFriendsToRoom } = require("./controllers/chatController");
const { addIssue, getIssueInfo } = require("./controllers/MentalIssuesController");
const { registerTherapist } = require("./controllers/authController");
const { reportPost, getReports } = require("./controllers/reportController");
const { postContactUs, getContacts } = require("./controllers/contactsController");


const uploadProfile = require("./controllers/imgsController").uploadProfile;
const uploadMW = require("./controllers/imgsController").uploadMW;


//------------------------------------------- Blog APIs ---------------------------------------------------//
router.post("/api/auth/signup" , validation(signUpSchema), signUp);
router.post("/api/auth/register-therapist" , registerTherapist);

router.get("/api/fetch-therapist" , getTherapists);

router.get("/api/therapist-rates/:id" , getTherapistRates);

router.get("/api/therapist-user/:id" , getTherapistById);

router.post("/api/therapist/rate/:id" , isUser, rateTherapist);

router.post("/api/auth/login" , validation(loginSchema) ,login );
router.get("/api/users" , isUser , getUsers );

router.get("/api/user/friendrequests" , isUser ,  getFriendRequests);

router.get("/api/user/:id" , getUserById);
router.put("/api/user/:id" , isUser , validation(updateSchema), updateUser);
router.get("/api/users/count" , isAdmin, countUsers);
router.get("/api/users/avg-age" , isAdmin, getAvgAge);
router.delete("/api/user/:id" , isAdminOrUserHimself , deleteUser);

router.post("/api/user/upload-photo" , isUser , uploadMW.single("image") , uploadProfile );

router.post("/api/posts" , isUser , uploadMW.single("image"), validation(postSchema) , addPost);
router.post("/api/posts-no-img" , isUser , validation(postSchema) , addPostNoImg ); 
router.get("/api/posts" , getPosts);
router.get("/api/posts/count" , countPosts); // Lazem tb2a fo2 el Route ely t7to , el :id -> 3shan lma ad5l klma count myftkrhash :id
router.get("/api/post/likes/:id" , getPostLikes);
router.get("/api/posts/:id" , getPostById);
router.delete("/api/posts/:id" , isUser , deletePost);

//---------------- Note ---------------//
// 2 Apis for update post
// 1- update post without image
// 2- update post with image 
// 3shaaan bel image ba7awl eldata le formData 3shan elmulter ta5odha , lakn lw mn 8er img bb3t json data w 5lsa
// w 5ally balek, mynf3sh t3ml el 2 fe api wa7ed -> 3shan fe el UpdatePost Component, msh b3rf a5od elsora elAdema
//                w a3mlha set w tb2a e5tyary zy pa2y elproperties
// ya ema b2a t3ml api lel data lw7dha , w api lel update post lw7do , zy ma hwa 3ml
router.put("/api/posts/:id" , isUser , validation(updatePostSchema) , updatePost); 
router.put("/api/posts/img/:id" , isUser  , uploadMW.single("image") , validation(updatePostSchema) , updatePostWithImg);
//----------------------------------------------------------------------------------------------
router.put("/api/posts/like/:id" , isUser , toggleLike)

router.get("/api/user/profile/:id" , getUserProfileById);

//router.post("/api/posts/comment/:id" , isUser , addComment); 
router.post("/api/comments/post/:id" , isUser , validation(commentSchema) ,addComment);

//router.get("/api/posts/comments" , isAdmin, getAllComments); // Error, Read Below
//Error: Cast to ObjectId failed for value \"comments\", 3shan el api da e3tbr "Comments" = :id, 3shan el Api line 39
router.get("/api/comments/posts" , isAdmin, getAllComments);
router.get("/api/comments/user/:id" , isAdminOrUserHimself, getUserComments);
router.delete("/api/comment/:id" , isUser, deleteComment);
router.put("/api/comment/:id" , isUser , validation(updateCommentSchema) , updateComment);
router.get("/api/comments/post/:id" , getPostComments);

router.post("/api/category" , isAdmin , validation(categorySchema) , addCategory);
router.get("/api/category" ,  getCategories);

router.post("/api/issue" , isAdmin , addIssue );
router.get("/api/issue/:issue" , getIssueInfo );


//------------------------------------------- Chat APIs ---------------------------------------------------//
router.post("/api/friend/sendreq" , userFriend , sendFriendRequest );
router.delete("/api/friend/cancelreq/:id" , userFriend , cancelFriendRequest); 
router.post("/api/friend/accept" , userFriend , acceptFriendRequest );
router.delete("/api/friend/reject/:id" , userFriend , rejectFriendRequest );
router.delete("/api/friend/delete/:id" , userFriend , deleteFriend );

router.get("/api/profile/mutual-friends/:id" , isUser, getMutualFriends);

router.get("/api/friends" , isUser, getFriends);

router.get("/api/user/profile/:id" , getUserProfileById);

router.get("/api/chat/:id" , isUser , getChatMssgs);
router.post("/api/chat/addmssg" ,isUser , postMssg);
router.get("/api/user-chats" , isUser, getUserChats);

router.post("/api/chat/create-group" , isUser, createChatGroup);

router.post("/api/chat/join-chat/:id" , isUser, joinChatGroup );
router.delete("/api/chat-group/:id" , isUser, leaveChatGroup );

router.post("/api/chat/add-friends/:id" , isUser , addFriendsToRoom);

router.get("/api/rooms" , getPublicGroups);
router.get("/api/getRoom/:room" , getRoomByName);

router.get("/api/rooms/count" , isAdmin, roomsCount);
router.get("/api/private-rooms/count" ,  isAdmin, privateRoomsCount);

router.post("/api/chat/addgroupmssg" , isUser , postGroupMssg);
router.get("/api/room/:id" , isUser , getRoomMssgs ); 

router.get("/api/rooms/user/:id" , getUserRooms);
router.get("/api/rooms/friend/:id" , isUser, getMutualRooms);

router.post("/api/report/:id" , isUser, reportPost);
router.get("/api/reports" , isAdmin , getReports);

router.post("/api/contact-us" , isUser, postContactUs );
router.get("/api/contacts" , isAdmin, getContacts );

module.exports = router;