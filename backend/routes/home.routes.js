import express from "express"
import { checkUser } from "../controllers/auth.controller.js";

const route=express.Router();

route.get("/",checkUser,(req,res)=>{
    res.send("Hello from the backend home page.");
})

route.get("/about",checkUser,(req,res)=>{
    res.send("Hello the the about page of backend home page.")
})

export default route;