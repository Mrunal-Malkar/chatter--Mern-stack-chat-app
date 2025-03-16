import express from "express";
import { checkUser } from "../middleware/checkuser.js";
import User from "../models/user.model.js";

let route = express.Router();

route.get("/", (req, res) => {
  res.send("hello this is action page");
});

route.post("/reqconnect", checkUser, async (req, res) => {
  try {
    let user = req.user.id;
    let toRequestUser = req.body.receiverId;

    let requestSender = await User.findById(user);
    let requestReceiver = await User.findById(toRequestUser);

    if (!requestSender || !requestReceiver) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (requestSender.sentRequests.includes(toRequestUser)) {
      return res.status(409).json({ message: "Request already sent!" });
    }

    if (requestReceiver.receivedRequests.includes(user)) {
      return res.status(409).json({ message: "Request already exists!" });
    }

    await Promise.all([
      User.findByIdAndUpdate(user, { $push: { sentRequests: toRequestUser } }),
      User.findByIdAndUpdate(toRequestUser, {
        $push: { receivedRequests: user },
      }),
    ]);

    res.status(200).json({ message: "Request sent!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in sending request!" });
  }
});

export default route;
