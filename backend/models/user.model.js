import mongoose from "mongoose";

const userScheema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  avatarno: {
    type: Number,
    default: 1,
  },
  connectedPeoples: {
    type: Array,
    dafault: [],
  },
  groupJoined: {
    type: Array,
    dafault: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userScheema);

export default User;
