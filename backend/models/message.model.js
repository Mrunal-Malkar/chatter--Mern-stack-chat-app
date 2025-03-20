import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    receiver:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    sender:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    group:{type:mongoose.Schema.Types.ObjectId,ref:"Group"},
    content:{type:String,required:true},
    date:{type:Number,default:Date.now()},
},{timestamps:true})

const Message=mongoose.model("Message",messageSchema);

export default Message;