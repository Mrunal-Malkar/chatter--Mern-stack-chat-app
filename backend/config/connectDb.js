import mongoose from "mongoose"

export const connectDb=async()=>{
try{

    await mongoose.connect("mongodb+srv://mrunalpmalkar:Ge5lB5y3pXIst30b@chattercluster.x6zob.mongodb.net/");
    console.log("connected to mongoose");

}catch{
    
    console.log("error in connecting to mongoose");

}
}