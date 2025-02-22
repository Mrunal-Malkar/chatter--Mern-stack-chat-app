import express from "express";
import {Server} from "socket.io";
import {createServer} from "http";
import signup_route from "./routes/sign-up.routes.js";
 
const app=express();
const PORT=3000;

const server=createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
    console.log("connected to the user at backend");

    socket.on("message",(message)=>{
        io.emit("msg",message);
    })

})

app.use("/index",signup_route)
app.get("/",(req,res)=>{
    res.send("home");
})

server.listen(PORT,()=>{
    console.log("sever is running on port",PORT);
})