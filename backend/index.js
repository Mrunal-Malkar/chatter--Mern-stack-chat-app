import express from "express";
import { connectDb } from "./config/connectDb.js";
import homeRoute from "./routes/home.routes.js"
import authRoute from "./routes/auth.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"

const app=express();
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use("/uploads",express.static("uploads")) 
app.use(express.urlencoded({ extended: true })); 


dotenv.config()
connectDb();

const PORT=3000;

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

app.use("/home",homeRoute);
app.use("/auth",authRoute);

app.listen(PORT,()=>{
    console.log("sever is running on port",PORT);
})