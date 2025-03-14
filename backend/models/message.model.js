import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    receiver:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    sender:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    content:{type:String,required:true},
    date:Date.now(),
},{timestamps:true})

const message=mongoose.model("Message",messageSchema);

export default message;