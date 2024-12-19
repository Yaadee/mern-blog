import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res, error) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
 
  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
  
    await newUser.save();
    return res.status(500).json("User created successfully");
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "username or email already registered",
      });
    }
    console.error(error);
    return res.status(500).json({ message: "server error try again later" });
  }
};
