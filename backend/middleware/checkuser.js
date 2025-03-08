
//for cheking user as a middleware 
export const checkUser=(req,res,next)=>{
    try{
    const token=req.cookies.token;
    
    let isAllowed=jwt.verify(token,process.env.SECRETKEY);

    if(!isAllowed){return res.redirect("http://localhost:5173/login?error=please login")};
    next();
}catch(err){

    console.log("error in checking if the token is valid:",err);
    return res.res.redirect(`http://localhost:5173/login?error=error:${err}`);

}}