import express from "express"

const route=express.Router();

route.get("/",(req,res)=>{
    res.send("Hello from the backend home page.");
})

route.get("/about",(req,res)=>{
    res.send("Hello the the about page of backend home page.")
})

export default route;