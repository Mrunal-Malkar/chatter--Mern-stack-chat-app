import User from "./../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


//for signup
export const signUpController=async(req,res)=>{
    try{
    
    const {username,email,password,avatarno}=req.body;
    if(!username || !email || !password || !avatarno){return res.redirect("http://localhost:5173/signup?error=in authontication, please fill the form!")}
    
    const saltRounds=10;
    const salt=await bcrypt.genSalt(saltRounds);
    const securedPassword=await bcrypt.hash(password,salt);
    
    const checkUser=await User.findOne({email:email});
    if(checkUser){return res.redirect("http://localhost:5173/signup?error=user already exist")}

    const newUser=await User.create({
        username:username,
        email:email, 
        password:securedPassword,
        avatarno:avatarno,
    })

    const Token=await jwt.sign({id:newUser._id},process.env.SECRETKEY,{expiresIn:"48h"});
    req.user=newUser;
    res.cookie("token", Token, {
        httpOnly: true,
        sameSite: "Strict", 
        maxAge: 1000 * 60 * 60 * 48,
    });

    return res.redirect("http://localhost:5173");

}catch(err){
    
    console.log("Authentication error:",err);
    res.status(404).json({message:"server error",error:err});
 
}
} 

//for login
export const LogInManager=async(req,res)=>{
    try{
    const {email,password}=req.body;
    if(!email || !password){return res.redirect("http://localhost:5173/login?error=please fill the form")}
    
    let user=await User.findOne({email:email});
    if(!user){return res.redirect("http://localhost:5173/signup?error=No user found!")};

    let securedPassword=user.password;
    const isUser=await bcrypt.compare(password,securedPassword); 
    if(!isUser){return res.redirect("http://localhost:5173/login?error=please fill correct details")}
    const Token=await jwt.sign({id:user._id},process.env.SECRETKEY,{expiresIn:"48h"});

    res.cookie("token",Token,{
        httpOnly:true,
        sameSite:"Strict",
        maxAge:1000*60*60*48,
    })

    return res.redirect("http://localhost:5173");

}catch(err){

    res.redirect(`http://localhost:5173/login?error=login error:${err}`);

}
}