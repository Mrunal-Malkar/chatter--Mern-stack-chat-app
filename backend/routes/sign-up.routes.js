import express from "express"
import multer from "multer"
import path from "path"

const route=express.Router();

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
  });

const upload=multer({storage})

route.post("/",upload.single("profilepic"),function(req,res){
    const {username,email,password}=req.body;
    
    let picUrl=`http://localhost:3000/uploads/${req.file.filename}`

    res.send(`${username} and email:${email}  and password:${password}  and profilepic: /n \n ${picUrl}`)
})

export default route