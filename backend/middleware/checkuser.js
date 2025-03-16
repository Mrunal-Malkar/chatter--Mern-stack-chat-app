import jwt from "jsonwebtoken";

//for cheking user as a middleware
export const checkUser = async (req, res,next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ error: "unauthorised request,please login!" });
    }

    let isAllowed = await jwt.verify(token, process.env.SECRETKEY);

    if (!isAllowed) {
      return res
        .status(401)
        .json({ error: "you are not authorised, please login" });
    }

    req.user = isAllowed;
    next();
  } catch (err) {
    console.log("error in checking if the token is valid:", err);
    return res.status(500).json({ error: err });
  }
};
