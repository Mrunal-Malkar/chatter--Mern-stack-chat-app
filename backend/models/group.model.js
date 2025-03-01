import express from "express"
import mongoose, { Types } from "mongoose"

const group=new mongoose.Schema({
    members:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    
})