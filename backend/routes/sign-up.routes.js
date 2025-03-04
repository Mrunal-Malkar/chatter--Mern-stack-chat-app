import express from "express"

const route=express.Router();

route.post("/",(req,res)=>{
    const {username,email,password,profilepic}=req.body;
    console.log(`${username} and email:${email}  and password:${password}  and profilepic:${profilepic}`)
    res.send(`${username} and email:${email}  and password:${password}  and profilepic:${profilepic}`)
})

export default route