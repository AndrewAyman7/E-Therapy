const Contact = require("../models/Contact");

const postContactUs = async (req,res,next)=>{
    let {mssg} = req.body;
    let {phone} = req.body;
    let userId = req.user;
    try{
        let chatDoc;
        if(phone){
            chatDoc = new Contact({
                mssg: mssg,
                phoneNumber: phone,
                user: userId
            })
        }else{
            chatDoc = new Contact({
                mssg: mssg,
                user: userId
            })
        }        

        let doc = await chatDoc.save();
        res.status(201).json(doc);
    }catch(err){
        res.status(400).json({message:err.message});
    }
}  

const getContacts = async(req,res,next)=>{
    try{
        let contacts = await Contact.find().populate("user" , "username _id");
        res.status(200).json(contacts);
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    postContactUs,
    getContacts
}