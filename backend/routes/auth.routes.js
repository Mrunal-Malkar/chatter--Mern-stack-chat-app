import express from "express"
import {LogInManager, signUpController} from "../controllers/auth.controller.js"

const route=express.Router();

route.get("/",(req,res)=>{
    res.redirect("/signup")
})

route.post("/signup",signUpController);
route.post("/login",LogInManager);
// route.post("/authonticate",checkUser);

export default route