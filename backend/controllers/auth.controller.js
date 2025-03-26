import User from "./../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//for signup
export const signUpController = async (req, res) => {
  try {
    const { username, email, password, avatarno } = req.body;
    if (!username || !email || !password || !avatarno) {
      return res
        .status(404)
        .json({ error: "error in authontication please fill the form!" });
    }

    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      console.log("user already exits");
      return res
        .status(404)
        .json({ error: "user already exist with that gmail" });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const securedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username: username,
      email: email,
      password: securedPassword,
      avatarno: avatarno,
    });

    const Token = await jwt.sign({ id: newUser._id }, process.env.SECRETKEY, {
      expiresIn: "48h",
    });

    res.cookie("token", Token, {
      httpOnly: true,
      secure: true, 
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 48,
    });

    return res.status(200).json({ message: "succesfully signed up!" });
  } catch (err) {
    console.log("Authentication error:", err);
    res.status(404).json({ message: "server error", error: err });
  }
};

//for login
export const LogInManager = async (req, res) => {
  try {
    console.log("you hitted log in manager");
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please fill the form!" });
    }

    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "No user found!" });
    }

    let securedPassword = user.password;
    const isUser = await bcrypt.compare(password, securedPassword);
    if (!isUser) {
      return res.status(401).json({ error: "incorrect details!" });
    }
    const Token = await jwt.sign({ id: user._id }, process.env.SECRETKEY, {
      expiresIn: "48h",
    });

    res.cookie("token", Token, {
      httpOnly: true,
      secure: true, 
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 48,
    });
    console.log("checked from login and setted the cookie:", Token);
    return res.status(200).json({ message: "succesfully loged-in!" });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err });
  }
};
