const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
    reportFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    reported: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required : true
    },
    reportDetails : String
},
    {timestamps:true}
);

const Report = mongoose.model("report" , ReportSchema);

module.exports = Report;