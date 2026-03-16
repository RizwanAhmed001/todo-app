import jwt from "jsonwebtoken";


export const auth = async (req, res, next) => {
  try {
    const {token} = req.headers;

     if (!token) {
      return res.json({ success: false, message: "Token not provided" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decode.id;

    next();

  } catch (error) {
    return res.json({success: false, message: error.message})
  }
}