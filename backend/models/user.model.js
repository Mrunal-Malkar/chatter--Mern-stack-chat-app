import mongoose from "mongoose"
import { connectDb } from "../config/connectDb";

connectDb();

const userScheema=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    profilepic:{
        type:String,
        default:"",
    },
    conncetedPeoples:{
        type:Array,
        dafault:[]
    },
    groupJoined:{
        type:Array,
        dafault:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

const User=mongoose.model("User",userScheema);

export default User