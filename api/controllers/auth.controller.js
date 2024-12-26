import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const {username, email, password} = req.body

  if(!username || !email || !password || username ==='' || email ==='' || password === ''){
     next(errorHandler(400, "All fields are required"))
    
  }
try {
  const hashedPassword = await bcryptjs.hash(password, 12)
  const user = new User({username, email, password:hashedPassword})
  await user.save();
  res.status(201).json("User created succeesfully")
  
} catch (error) {
  if (error.code === 11000) {
    // return next(error)
    // Handle duplicate key
    const field = Object.keys(error.keyValue)[0]; 
    const value = error.keyValue[field]; 
    return res.status(400).json({
        success: false,
        message: `Duplicate value for ${field}: "${value}". Please use a different ${field}.`,
    });
}
}
};