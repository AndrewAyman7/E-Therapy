const { Chats } = require("../models/Chat");
const { Mssgs } = require("../models/Mssgs");

const { GroupChat } = require("../models/GroupChat"); 
const { GroupMssgs } = require("../models/GroupMssgs");
//const { ObjectId } = require('mongodb');


const getChatMssgs = async(req,res,next)=>{
    let chatId = req.params.id;
    let userId = req.user;
    try{
        let isChatBelongs = await Chats.findById(chatId); 
        //console.log(isChatBelongs);
        if(isChatBelongs.users.includes(userId)){   // 3shan a make sure en eluser da belongs to that chat
            let mssgs = await Mssgs.find({chat: chatId} , null , {sort:{timestamp:1}}).populate({
                path: "chat",
                model: "chat",
                populate: {
                    path: "users",
                    model: "user",
                    select: "username profileimg"
                }
            }) // Note : Explaination : (populate code)
               // its = find().populate("chat").populate("users") ->bs hena elchat msh btReturn objectId bta3 eluser bs, de bt return kza haga mnhom elObjectId.
               // fa lazem ad5l gwaha w a3ml populate le field gwaha bs.
            res.status(200).json(mssgs);
        }else{
            res.status(403).json({message:"You Are Forbidden, its not your chat"});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

const postMssg = async(req,res,next)=>{
    let mssg = req.body;
    let userId = req.user;
    try{
        let isChatBelongs = await Chats.findById(mssg.chat);
        if( isChatBelongs.users.includes(userId) ){
            //console.log(mssg);
            mssg.timestamp = Date.now();  // Add Property
            let newMssg = new Mssgs(mssg);
            let resMssg = await newMssg.save();
            res.status(200).json(resMssg);
        }else{
            res.status(403).json({message:"You Are Forbidden, its not your chat"});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

const createChatGroup = async(req,res,next)=>{
    let userId = req.user;
    let data = req.body;
    try{
        if(data.privacy === "") data.privacy = "public";
        let isGroupExist = await GroupChat.find({groupName:data.groupName, privacy:`public`});
        if( isGroupExist.length>0  && data.privacy === "public"){
            //console.log(isGroupExist.lenght>0 && data.privacy === "public")
            res.status(400).json({message: "There is Already exist, choose another name"});
        }else{
            data.users.push(userId);
            let newChat = new GroupChat({
                users: data.users,
                creator: userId,
                groupName: data.groupName,
                privacy: data.privacy
            });
            let chatDoc = await newChat.save();
            res.status(200).json(chatDoc);
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

const joinChatGroup = async(req,res,next)=>{
    let userId = req.user;
    let chatId = req.params.id;
    try{
        let group = await GroupChat.findById(chatId);
        if(group){
            if(group.privacy==="public"){
                let isAlreadyJoined = group.users.find((user)=>user.toString() === userId);
                if(isAlreadyJoined){
                    res.status(400).json({message:"You are in already"});
                }else{
                    let joined = await GroupChat.findByIdAndUpdate(chatId , { $push: {users: userId} } , {new:true});
                    res.status(200).json(joined);
                }
            }else{
                res.status(401).json({message:"This Group is private, you are not Authorized"});
            }
        }else{
            res.status(404).json({message:"group not found"});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

const leaveChatGroup = async(req,res,next)=>{
    let userId = req.user;
    let chatId = req.params.id;
    try{
        let group = await GroupChat.findById(chatId);
        if(group){
                let isAlreadyJoined = group.users.find((user)=>user.toString() === userId);
                if(isAlreadyJoined){
                    let leaved = await GroupChat.findByIdAndUpdate(chatId , { $pull: {users: userId} } );
                    res.status(200).json({ message: "deleted successfully" });
                }else{
                    let joined = await GroupChat.findByIdAndUpdate(chatId , { $push: {users: userId} } , {new:true});
                    res.status(400).json({message: "You Should Join first"});
                }
        }else{
            res.status(404).json({message:"group not found"});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

const getPublicGroups = async(req,res,next)=>{
    try{
        let groups = await GroupChat.find({privacy:"public"}).populate(
            [
                {
                    path: "users",
                    model: "user",
                    select: "username profileimg"
                },

                {
                    path: "creator",
                    model: "user",
                    select: "username profileimg"
                }
            ] 
        );
        res.status(200).json(groups);
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

const postGroupMssg = async(req,res,next)=>{
    let mssg = req.body;
    try{
        mssg.timestamp = Date.now();
        let newMssg = new GroupMssgs(mssg);
        let resMssg = await newMssg.save();
        res.status(200).json(resMssg);
    }catch(err){
        res.status(400).json({message:err.message});
    }
}



const getRoomMssgs = async(req,res,next)=>{
    let RoomId = req.params.id;
    let userId = req.user;
    try{
        let room = await GroupChat.findById(RoomId);
        let isUserAllowed = room.users.includes(userId);
        //console.log(isUserAllowed);
        if(isUserAllowed){
            let groupInfo =  await GroupChat.find({_id: RoomId}).populate({
                path: "users",
                model: "user",
                select: "_id username profileimg"
            });
            //console.log(groupInfo);
            let mssgs = await GroupMssgs.find({chat: RoomId} , null , {sort:{timestamp:1}}).populate({
                path: "sender",
                model: "user",
                select: "username profileimg"
            });
            res.status(200).json({groupInfo , mssgs});
        }else if(room.privacy==="private"){
            res.status(401).json("Forbidden, you are not allowed, its a private Room");
        }else{
            res.status(403).json("Forbidden, Join Room First");
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

const getRoomByName = async(req,res,next)=>{
    let roomName = req.params.room;
    try{
        let room = await GroupChat.findOne({groupName: roomName});
        //console.log(room);
        res.status(200).json(room);
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
}

const getUserRooms = async(req,res,next)=>{
    let profileId = req.params.id;
    try{
        let groups = await GroupChat.find({privacy:"public" , users: profileId}).populate(
            [
                {
                    path: "users",
                    model: "user",
                    select: "username profileimg"
                },

                {
                    path: "creator",
                    model: "user",
                    select: "username profileimg"
                }
            ] 
        );
        res.status(200).json(groups);
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

const getMutualRooms = async(req,res,next)=>{
    let profileId = req.params.id;
    let userId = req.user;
    try{
        let groups = await GroupChat.find( { $and : [ {users:userId} , {users:profileId} ] } ) // Mongoose Logical Query Operators
        /*.populate( 
            [
                {
                    path: "users",
                    model: "user",
                    select: "username profileimg"      users: { $in : [userId,profileId]}
                },

                {
                    path: "creator",
                    model: "user",
                    select: "username profileimg"
                }
            ] 
        );*/
        res.status(200).json(groups);
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

const roomsCount = async(req,res,next)=>{
    try{
        let count = await GroupChat.count({privacy:"public"});
        res.status(200).json(count);
    }catch(err){
        res.status(400).json({message:err.message});
    }
}
const privateRoomsCount = async(req,res,next)=>{
    try{
        let count = await GroupChat.count({privacy:"private"});
        res.status(200).json(count);
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

const getUserChats = async(req,res,next)=>{
    let userId = req.user;
    try{
        let chats = await Chats.find({users:userId}).populate("users" , "username profileimg" , {_id : {$ne:userId}});
        res.status(200).json(chats);
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

const addFriendsToRoom = async(req,res,next)=>{
    let users = req.body;
    let chatId = req.params.id;
    //console.log( "users " , users);
    try{
        let group = await GroupChat.findById(chatId);
        if(group){
            if(users && users.length>1){  // 3shan lw el array (added users) feha user 1 bs, my3mlsh koll da
                let filteredUsers= []; // To Check that the all the users array , kolohm msh fe elGroup already
                //console.log(group.users);
                let usersToJoin = users.some(el => {
                    if(group.users.find((user)=>user.toString() === el)){
                    }else{
                        filteredUsers.push(el)
                    }
                    //console.log(el);
                });
                let joined = await GroupChat.findByIdAndUpdate(chatId , { $push: {users: filteredUsers } } , {new:true});
                res.status(200).json(joined);
            }else if(users && users.length ===1 ){
                let isAlreadyJoined = group.users.find((user)=>user.toString() === users[0]);
                if(isAlreadyJoined){
                    res.status(400).json({message:"He is already in"});
                }else{
                    let joined = await GroupChat.findByIdAndUpdate(chatId , { $push: {users: users[0]} } , {new:true});
                    res.status(200).json(joined);
                }
            }else{
                res.status(400).json({message:err.message});
            }

        }else{
            res.status(404).json({message:"group not found"});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

module.exports = {
    getChatMssgs,
    postMssg,
    getUserChats,

    createChatGroup,
    joinChatGroup,
    getPublicGroups,
    postGroupMssg,
    getRoomMssgs,
    getUserRooms,
    getMutualRooms,
    roomsCount,
    privateRoomsCount,
    leaveChatGroup,
    getRoomByName,
    addFriendsToRoom
}