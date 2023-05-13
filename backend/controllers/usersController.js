const User = require("../models/User").User;
const Posts = require("../models/Post");
const Comment = require("../models/Comments");
const bcrypt = require("bcrypt");

// Note About StatusCodes -> 200: successfully, 201: Created Successfully , so, any get req = 200
const getUsers = async (req,res,next)=>{
    let users = await User.find().select("-password");
    res.status(200).json(users);
}

const getUserById = async(req,res,next)=>{
    const {id} = req.params;
    try{
        const user = await User.findById(id).select("-password");
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({message:"User Not Found"});
        }
    }catch(err){
        res.status(400).json({message:err.message})  // 3shan lw d5l id msh object id asln -> el mongoose, findById htrg3lo error fe el catch
    }
}

const getUserProfileById = async(req,res,next)=>{
    const {id} = req.params;
    try{
        const user = await User.findById(id).select("-password").populate({
            path: "posts",
            model: "post",
            populate : {
                path: "comments",
                model: "comment",
            }
        });
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({message:"User Not Found"});
        }
    }catch(err){
        res.status(400).json({message:err.message})  // 3shan lw d5l id msh object id asln -> el mongoose, findById htrg3lo error fe el catch
    }
}

const updateUser = async(req,res,next)=>{
    let userId = req.user;
    let id = req.params.id;
    try{
        const user = await User.findById(id).select("-password");
        if(user){
            if(user._id == userId){    // 3shan at2kd en ely by3dl da hwa sa7eb el account, mmmkn t3mla MW lw7dha
                if(req.body.password){
                    req.body.password = await bcrypt.hash(req.body.password , 2);
                }
                let updatedData = await User.findByIdAndUpdate( id, {
                    $set: {
                        username: req.body.username,
                        password: req.body.password,
                        bio: req.body.bio
                    }
                }, {new:true} ).select("-password").populate("posts"); // 3shan eldata de htrg3 lel front end w yzhrhaaa fe profile
                res.status(201).json({message: "updated Success" , updatedData});
            }else{
                res.status(401).json({message:"You Are Not Authorized"});
            }
        }else{
            res.status(400).json({message:"user not found"});
        }

    }catch(err){
        res.status(400).json({message:err.message});  // ela7san t3mlo fe middleware lw7do
    } 
}

const countUsers = async (req,res,next)=>{
    let num = await User.count();
    res.status(200).json(num);
}

const deleteUser = async(req,res,next)=>{
    //console.log(req.params);
    try{
        let user = await User.findById(req.params.id);
        if(user){
            await User.findByIdAndDelete(req.params.id);

            // @ ToDo -> Delete All Users Photos , Posts , comments , likes
            await Posts.deleteMany({user: req.params.id});
            await Comment.deleteMany({userId: req.params.id});
            res.status(201).json({message:"User Deleted Successfully"});
        }
        else{
            res.status(404).json({message:"User Not Found"});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }

    // @ ToDo -> Delete All Users Photos , cloudinary
}

const getFriendRequests = async(req,res,next)=>{
    let userId = req.user;
    try{
        let requests = await User.findById(userId , {friendRequests:true});
        res.status(200).json(requests);
    }catch(err){
        res.status(400).json({message:err.message});  // ela7san t3mlo fe middleware lw7do
    } 
}

const getFriends = async(req,res,next)=>{
    const userId = req.user;
    try{
        let friends = await User.findById(userId, {friends:true});
        if(friends){
            res.status(200).json(friends);
        }else{
            res.status(404).json({message:"User Not Found"});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

const getAvgAge = async(req,res,next)=>{
    try{
        let users = await User.find({}).select("age");
        let sum=0;
        users.map( user=> sum+= user.age  );
        res.status(200).json( Math.ceil( sum/users.length )  );
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

const getTherapists = async(req,res,next)=>{
    try{
        let therapists = await User.find( {therapist: {"$exists": true } }).select("-password");
        let sum=0;
        for(i=0; i<therapists.length; i++){
            let therapiRatesSum = therapists[i].therapist.rates.reduce((accumulator, value) => { return accumulator + value.rate }, 0);
            therapists[i].therapist.avgRates = Math.ceil(therapiRatesSum/ therapists[i].therapist.rates.length);
            //console.log(therapists[i].therapist.avgRates);
        }
        res.status(200).json(therapists);
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

const getTherapistById = async(req,res,next)=>{
    let therapistId = req.params.id;
    try{
        let user = await User.findById( therapistId ).select("-password").populate({
            path: "posts",
            model: "post",
            populate : {
                path: "comments",
                model: "comment",
            }
        });
        let sum=0;
        let therapiRatesSum = user.therapist.rates.reduce((accumulator, value) => { return accumulator + value.rate }, 0);
        user.therapist.avgRates = Math.ceil(therapiRatesSum/ user.therapist.rates.length);
        console.log(user.therapist.avgRates);
        res.status(200).json(user);
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

const getTherapistRates = async(req,res,next)=>{
    let therapistId = req.params.id;
    try{
        let therapists = await User.findById( therapistId ).select("therapist.rates.rate");
        let sum=0;
        let therapiRates = therapists.therapist.rates.map(rate => sum+= rate.rate);
        res.status(200).json( Math.ceil( sum/ therapists.therapist.rates.length ) );
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

const rateTherapist = async(req,res,next)=>{
    let therapistId = req.params.id;
    let {rate} = req.body;
    let userId = req.user;
    try{
        
        let therapi = await User.findById(therapistId);
        let isAlreadyLiked = therapi.therapist.rates.find((r)=>r.id.toString() === userId);
        let therapiRate;
        if(isAlreadyLiked){
            therapiRate = await User.findByIdAndUpdate(therapistId, {
                //$push: { "therapist.rates" : {rate: rate, id: therapistId } }
                //$set: { "therapist.rates.$[id]" : {rate: rate, id: therapistId }  }
                $set : { "therapist.rates.$[elem].rate" : rate } },
                { arrayFilters: [ { "elem.id": isAlreadyLiked.id} ] }
            );
        }else{
            therapiRate = await User.findByIdAndUpdate(therapistId, {
                $push: { "therapist.rates" : {rate: rate, id: userId } }
            });
        }
        res.status(201).json(therapiRate);
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

const getMutualFriends = async(req,res,next)=>{
    const userId = req.user;
    const profileId = req.params.id;
    try{
        if(userId !== profileId){
            const userFriends = await User.findById(userId, {friends:true});
            const profileFriends = await User.findById(profileId, {friends:true});
            const mutualFriends = userFriends.friends.filter(el=> {
                return profileFriends.friends.some( fr=>fr.username === el.username );
            } );
            res.status(200).json(mutualFriends);
        }else{
            res.status(400).json({message:"its you"});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    countUsers,
    deleteUser,
    getUserProfileById,
    getFriendRequests,
    getFriends,
    getAvgAge ,
    getTherapists,
    rateTherapist,
    getTherapistRates,
    getTherapistById,
    getMutualFriends
}