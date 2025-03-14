import mongoose, { Types } from "mongoose";

const group = new mongoose.Schema({
  groupName:{type:String,required:true,},
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  groupAdmin:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  messages:[{type:mongoose.Schema.Types.ObjectId,ref:"Message"}],
});

const Group=mongoose.model("Group",group);
export default Group;
