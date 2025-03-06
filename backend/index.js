import express from "express";
import homeRoute from "./routes/home.routes.js"
import signUpRoute from "./routes/sign-up.routes.js"
import cors from "cors"

const app=express();
app.use(cors({origin:"http://localhost:5173/"}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/uploads",express.static("uploads"))

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
app.use("/signup",signUpRoute);

app.listen(PORT,()=>{
    console.log("sever is running on port",PORT);
})