import express from "express";
import { connectDb } from "./config/connectDb.js";
import authRoute from "./routes/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { checkUser } from "./middleware/checkuser.js";
import mongoose from "mongoose";
import http from "http";
import User from "./models/user.model.js";
import { Server, Socket } from "socket.io";
import actionRouter from "./routes/action.routes.js";
import Message from "./models/message.model.js";

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

dotenv.config();
connectDb();

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("msgsent", async (details) => {
    try {
      let sender = await User.findOne({ email: details.sender });
      let receiver = await User.findOne({ email: details.receiver });

      if (!sender || !receiver) {
        socket.emit("failed", "No user found");
        return;
      }

      let newMessage = await new Message({
        sender: sender._id,
        receiver: receiver._id,
        content: details.message,
      });

      await newMessage.save();

      await User.findOneAndUpdate(
        { email: details.sender },
        { $push: { messages: newMessage._id } }
      );

      await User.findOneAndUpdate(
        { email: details.receiver },
        { $push: { messages: newMessage._id } }
      );

      io.emit("msg", newMessage); // Broadcast the message to all clients
      socket.emit("success", "Successfully sent the message");
    } catch (error) {
      console.error("Error sending message:", error);
      socket.emit("failed", "An error occurred while sending the message");
    }
  });
});

const PORT = 3000;

app.use("/auth", authRoute);
app.use("/action", actionRouter);

app.get("/getAvailable", checkUser, async (req, res) => {
  try {
    let requestedUser = req.user.id;
    let user = await User.findById(requestedUser).select("-password");
    let availableContacts = await User.find({
      _id: {
        $nin: [
          ...user.connections,
          ...user.receivedRequests,
          ...user.sentRequests,
          requestedUser,
        ],
      },
    }).select("-password");
    res.status(200).json({ contacts: availableContacts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error in getting availble contacts" });
  }
});

app.get("/getRequested", checkUser, async (req, res) => {
  try {
    let requestedUser = req.user.id;
    let availableUser = await User.findById({ _id: requestedUser })
      .select("receivedRequests")
      .populate("receivedRequests", "-password");
    if (!availableUser) {
      res.status(404).json({ message: "No contacts found!" });
    }
    res.status(200).json({ contacts: availableUser.receivedRequests });
  } catch (err) {
    console.log(err);
    res.status(504).json({ message: "Server error" });
  }
});

app.post("/getMessages", checkUser, async (req, res) => {
  try {
    let sender = req.user.id;
    let receiver = req.body.receiver._id;

    let messages = await Message.find({
      $or: [
        { sender: sender, receiver: receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ createdAt: 1 });

    if (messages.length == 0) {
      return res.status(404).json({ message: "no message found!" });
    }

    if (messages) {
      return res.status(200).json({ messages: messages });
    } else {
      return res.status(504).json({ message: "could not fetch messages" });
    }
  } catch (err) {
    console.log("error in backend while retrieving messages:", err);
    return res.status(504).json({ message: "Some error occured at server" });
  }
});

app.get("/getuser", checkUser, async (req, res) => {
  try {
    let user = req.user;
    if (user) {
      const details = await User.findOne({ _id: user.id })
        .populate("connections")
        .select("-password");
      res.status(200).json({ user: details });
    } else {
      res.status(399).json({ message: "No user found" });
    }
  } catch (err) {
    res.status(400).json({ message: "error to identify the user" });
  }
});

// app.get("/getusers", checkUser, async (req, res) => {
//   try {
//     let user = req.user;
//     let userdetails = await User.find({ _id: user.id }).select("-password");
//   } catch {
//     console.log("users finding error");
//   }
// });

app.get("/getconnections", checkUser, async (req, res) => {
  try {
    let user = req.user;
    let connections = await User.find({ _id: user.id });
    if (connections) {
      res.status(200).json({ connections: connections.conncetedPeoples });
    }
  } catch (err) {
    res.status(404).json({ message: "some error occured" });
  }
});

app.get("/", checkUser, (req, res) => {
  res.status(200).json({ message: "User is authenticated" });
});

server.listen(PORT, () => {
  console.log("sever is running on port", PORT);
});
