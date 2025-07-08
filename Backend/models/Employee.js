const mongoose = require("mongoose")
const employeeSchema = new mongoose.Schema({
    // name, email, phone number, city

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        default:false
    },
    city:{
        type:String
    }
})
module.exports = mongoose.model("Employee",employeeSchema)