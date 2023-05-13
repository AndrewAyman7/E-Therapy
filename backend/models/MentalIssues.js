const mongoose = require("mongoose");

const mentalIssuesSchema = new mongoose.Schema({
    category: {  
        type: String,
        ref: "categorie",
        required: true
    },
    details: { 
        type: String,
        required: true
    }
},
    {timestamps:true}
);

const MentalIssues = mongoose.model("mentalIssue" , mentalIssuesSchema);

module.exports = MentalIssues;