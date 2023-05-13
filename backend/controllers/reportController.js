const Report = require("../models/Reports");

const reportPost = async(req,res,next)=>{
    let reported = req.params.id;
    let userId = req.user;
    let {report} = req.body;
    try{
        let repo = new Report({
            reportFrom: userId,
            reported: reported,
            reportDetails: report
        });
        await repo.save();
        res.status(201).json(repo);
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

const getReports = async(req,res,next)=>{
    try{
        let reports1 = await Report.find({}).populate("reportFrom reported" , [ "username" , "age" , "user" , "content" ]);// its working well, but :
        // msh ht3rf td5ol gwa el reported post t3ml populate lel user (post.user);
        let reports2 = await Report.find({}).populate([{
            path: "reportFrom",
            model: "user",
            select: "username"
            },
            {
            path: "reported",
            model: "Post",
            select: "user content",
            populate: {
                path: "user",
                model: "user",
                select: "username"
            }
    } ]) 
        res.status(200).json(reports2);
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

module.exports = {
    reportPost,
    getReports
}
