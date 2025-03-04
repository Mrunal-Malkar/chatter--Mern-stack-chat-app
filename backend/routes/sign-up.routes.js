import express from "express"

const route=express.Router();

route.post("/",(req,res)=>{
    const {username,email,password}=req.body;
})

export default route