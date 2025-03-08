import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const connectDb=async()=>{
try{
 
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_DB_PASSWORD}@chattercluster.x6zob.mongodb.net/`);
    console.log("connected to mongoose");

}catch(err){
    
    console.log("error in connecting to mongoose:",err);

}
} 