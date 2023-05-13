const MentalIssues = require("../models/MentalIssues.js");

const addIssue = async(req,res,next)=>{   // only Admins
    try{
        let issue = new MentalIssues({
            category: req.body.category,
            details: req.body.details
        });
        await issue.save();
        res.status(201).json(issue); // B3mlo Return lel front fe elResponse 3shan ya5do w y3mlo push fe elstate elgdeda fe elRedux
    }catch(err){
        console.log(err);
        res.status(400).json({message:err.message});
    }
}

const getIssueInfo = async(req,res,next)=>{
    let issue = req.params.issue;
    try{
        let info = await MentalIssues.find({category:issue}).select("details");
        res.json(info);
    }catch(err){

    }
}


module.exports = {
    addIssue,
    getIssueInfo
}