const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    studenId : {
        type : String,
        required : true,
        unique : true
    },
    firstName : {
        type : String,
        requied : true,
    },
    lastName :{
        type : String,
        required : true,
    },
    major : {
        type : mongoose.Schema.ObjectId,
        ref : 'Major'
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Student',studentSchema)