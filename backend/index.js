import express from "express";
import homeRoute from "./routes/home.routes.js"

const app=express();
app.use(express.json());

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

app.use("/",homeRoute)

app.listen(PORT,()=>{
    console.log("sever is running on port",PORT);
})