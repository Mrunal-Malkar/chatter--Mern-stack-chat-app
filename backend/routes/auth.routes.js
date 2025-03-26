import express from "express";
import {
  LogInManager,
  signUpController,
} from "../controllers/auth.controller.js";

const route = express.Router();

route.get("/", (req, res) => {
  res.redirect("/signup");
});

route.post("/signup", signUpController);
route.post("/login", LogInManager);

route.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "None",
  });
  res.status(200).json({ message: "successfully loged out!" });
});

// route.post("/authonticate",checkUser);

export default route;
