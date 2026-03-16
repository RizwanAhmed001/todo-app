import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "All Fields Are Mandatory!" });
    }

    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Please use a strong password!",
      });
    }

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!gmailRegex.test(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email address!",
      });
    }

    const emailExist = await UserModel.findOne({ email });

    if (emailExist) {
      return res.json({ success: false, message: "Email Already Exist!" });
    }

    const newPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ name, email, password: newPassword });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    const userDetails = {name: newUser.name}

    return res.send({ success: true, message: "User Register", userDetails, token });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    if(!email || !password){
      return res.json({success: false, message: "Invalid Credentials!"})
    }

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!gmailRegex.test(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email address!",
      });
    }

    const emailExist = await UserModel.findOne({email});

    if(!emailExist){
      return res.json({success: false, message: "No Such Email Exist!"})
    }

    const correctPassword = await bcrypt.compare(password, emailExist.password);

    if(!correctPassword){
      return res.json({success: false, message: "Wrong Password!"})
    }

    const token = jwt.sign({id: emailExist._id}, process.env.JWT_SECRET);

    const userDetails = {name: emailExist.name}

    return res.json({success: true, message: "User Login",userDetails, token})

    
  } catch (error) {
    return res.json({success: false, message: error.message})
  }
}
