import express from "express";
import { connectDb } from "./config/connectDb.js";
import authRoute from "./routes/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { checkUser } from "./middleware/checkuser.js";
import mongoose from "mongoose";
import User from "./models/user.model.js";

const app = express(); 
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

dotenv.config(); 
connectDb();

const PORT = 3000;

// import {Server} from "socket.io";
// import {createServer} from "http";
// const server=createServer(app);
// const io=new Server(server,{
//     cors:{
//         origin:"http://localhost:5173",
//         methods:["GET","POST"]
//     }
// })

// io.on("connection",(socket)=>{
//     console.log("connected to the user at backend");

//     socket.on("message",(message)=>{
//         io.emit("msg",message);
//     })

// })

app.use("/auth", authRoute);

app.get("/getuser", checkUser, async (req, res) => {
  let user = req.user;
  console.log("this is the user at backen:", user);
  if (user) {
    const details = await User.findOne({ _id: user.id }).select("-password");
    res.status(200).json({ user: details });
  } else {
    res.status(399).json({ message: "No user found" });
  }
});

app.get("/getusers",checkUser,async(req,res)=>{
  let user=req.user;
  let userdetails=await User.find({_id:user.id}).select("-password");
  // let connectedusers=userdetails.filter();
  console.log(userdetails);
})

app.get("/getconnections",checkUser,async(req,res)=>{
  let user=req.user;
  let connections=await User.find({_id:user.id})
  if(connections){
    res.status(200).json({connections:connections.conncetedPeoples});
  }
})

app.get("/", checkUser, (req, res) => {
  res.status(200).json({ message: "User is authenticated" });
});

app.listen(PORT, () => {
  console.log("sever is running on port", PORT);
});
