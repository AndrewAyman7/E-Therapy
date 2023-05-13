const Post = require("../models/Post");
const User = require("../models/User").User;

const addPost = async(req,res,next)=>{
    let post = new Post(
        {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            user: req.user, // id
            image: {                          // (new): kda elImg hatb2a daroory, lw msh 3ayzha darory, e3mla route lw7dha..
                url: `/${req.file.filename}`,
                publicId: `/${req.file.filename}`
            }
        }
    );
    await post.save();
    res.status(201).json({message:"Post Created" , post});
}

const addPostNoImg = async(req,res,next)=>{
    let post = new Post(
        {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            user: req.user, // id
        }
    );
    await post.save();
    res.status(201).json({message:"Post Created" , post});
}

const getPosts = async(req,res,next)=>{
    const {page , category} = req.query;
    const postsPerPage = 3;
    let posts;
    if(page){
        posts = await Post.find().skip((page-1)*postsPerPage).limit(postsPerPage).sort({createdAt: -1}).populate("user comments" , ["-password"]);
    }else if(category){
        posts = await Post.find({category}).limit(postsPerPage).sort({createdAt: -1}).populate("user comments" , ["-password"]);
    }else{
        posts = await Post.find().sort({createdAt: -1}).populate("user comments" , ["-password"]);
    }

    res.status(200).json(posts);
}

const getPostById = async(req,res,next)=>{
    let {id} = req.params;
    try{
        let post = await Post.findById(id).populate("user comments" , ["-password"]); // gwa el try 3shan -> lw da5l id msh objectId -> elmongoose ht3ml error
        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json({message:"No Post Found" });
        }
    }catch(err){   // 3shan lw da5l id msh objectId -> elmongoose ht3ml error
        res.status(400).json({message:"No Post Found" , error: err.message });
    }
}

const getPostLikes = async(req,res,next)=>{
    let {id} = req.params;
    try{
        let likes = await Post.findById(id , "likes").populate("likes" , ["username" , "_id"] );
        res.status(200).json(likes);
    }catch(err){
        
    }
}

const countPosts = async(req,res,next)=>{
    const num = await Post.count();
    res.status(200).json(num);
}

const deletePost = async(req,res,next)=>{
    // using isUser Guard MW 
    let userId = req.user;
    let paramId = req.params.id; // Post

    try{
        let user = await User.findById(userId).select("-password");
        //console.log(user);
        let admin = user.isAdmin;
    
        let postId = await Post.findById(paramId);
        //console.log(postId);  //console.log(postId.user.toString());
        let postUser = postId.user.toString(); // sa7eb el post ->  ( new ObjectId("63f526039da94819392f883c") -> 63f526039da94819392f883c )
    
        
        if(admin || userId==postUser){
            let xPost = await Post.findByIdAndDelete(paramId);
            // @ ToDo -> Delete Photo , comments and likes of post
            res.status(200).json({message:"Post has been Deleted Successfully" , xPost}); // return elPost 3shan elfrontend yms7o mn elstate
        }else{
            res.status(403).json({message:"You Are Not Allowd, user himself only or admin"})
        }
    }catch(err){   // To handle error: UnhandledPromiseRejectionWarning: CastError: Cast to ObjectId failed for value "vvvsvsv", lw d5l ay id
        res.status(400).json({message:"failed" , error: err.message})
    }

    
}

const updatePost = async (req,res,next)=>{
    // @ToDo -> controller for Update Image , #14
    let postId = req.params.id;
    let userId = req.user;

    //console.log(post);
    try{
        let post = await Post.findById(postId);
        if(post){
            if(userId == post.user.toString()){
                let updatedPost = await Post.findByIdAndUpdate(postId, {
                    $set: {
                        title: req.body.title,
                        content: req.body.content,
                        category: req.body.category
                    }
                },
                {new: true} // to return post after update // To render it in frontend
                ).populate("user" , ["-password"]);
                res.status(200).json(updatedPost);
            }else{
                res.status(401).json({message:"user himself only can update post"});
            }
        }else{
            res.status(400).json({message:"No post found"});
        }
    }catch(err){
        res.status(400).json({message:"failed" , error: err.message});
    }

}

//---------------- Note ---------------//
// 2 Apis for update post
// 1- update post without image
// 2- update post with image 
// 3shaaan bel image ba7awl eldata le formData 3shan elmulter ta5odha , lakn lw mn 8er img bb3t json data w 5lsa
// w 5ally balek, mynf3sh t3ml el 2 fe api wa7ed -> 3shan fe el UpdatePost Component, msh b3rf a5od elsora elAdema
//                w a3mlha set w tb2a e5tyary zy pa2y elproperties
// ya ema b2a t3ml api lel data lw7dha , w api lel update post lw7do , zy ma hwa 3ml

const updatePostWithImg = async (req,res,next)=>{
    // @ToDo -> controller for Update Image , #14
    let postId = req.params.id;
    let userId = req.user;
    //console.log(post);
    try{
        let post = await Post.findById(postId);
        if(post){
            if(userId == post.user.toString()){
                let updatedPost = await Post.findByIdAndUpdate(postId, {
                    $set: {
                        title: req.body.title,
                        content: req.body.content,
                        category: req.body.category,
                        image: {                          // (new): kda elImg hatb2a daroory, lw msh 3ayzha darory, e3mla route lw7dha..
                            url: `/${req.file.filename}`,
                            publicId: `/${req.file.filename}`
                        }
                    }
                },
                {new: true} // to return post after update // To render it in frontend
                ).populate("user" , ["-password"]);
                res.status(200).json(updatedPost);
            }else{
                res.status(401).json({message:"user himself only can update post"});
            }
        }else{
            res.status(400).json({message:"No post found"});
        }
    }catch(err){
        res.status(400).json({message:"failed" , error: err.message});
    }

}

const toggleLike = async(req,res,next)=>{
    let userId = req.user;
    let postId = req.params.id;
    let toggleLikePost;

    try{
        let post = await Post.findById(postId);
        if(post){
            let isAlreadyLiked = post.likes.find((user)=>user.toString() === userId);
            if(isAlreadyLiked){
                toggleLikePost = await Post.findByIdAndUpdate(postId , {
                    $pull: {likes: userId}
                } , {new:true});   // mtktbhash lw 3ayez, de 3shan a return ellikes elgdeda
            }else{
                toggleLikePost = await Post.findByIdAndUpdate(postId , {
                    $push: {likes: userId}
                }, {new:true});
            }
            res.status(200).json(toggleLikePost);
        }else{
            res.status(400).json({message:"No post found"});
        }
    }catch(err){
        res.status(400).json({message:"failed" , error: err.message});
    }

}



//------------------ @ToDo -> controller for Update Image , #14 --------------------//

module.exports = {
    addPost,
    addPostNoImg,
    getPosts,
    getPostById,
    countPosts,
    deletePost,
    updatePost,
    toggleLike,
    updatePostWithImg,
    getPostLikes
}

