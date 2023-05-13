const mongoose = require("mongoose");

let contactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    mssg: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false
    }
});

let Contact = mongoose.model("contact" , contactSchema);

module.exports = Contact;