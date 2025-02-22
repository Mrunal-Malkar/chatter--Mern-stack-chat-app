import express from "express";

const router=express.Router();

router.get("/sign-up",(req,res)=>{
    res.send("sign-up");
})

router.get("/",(req,res)=>{
    res.send("home");
})

export default router;