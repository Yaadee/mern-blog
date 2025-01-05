import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
  const {username, email, password} = req.body

  if(!username || !email || !password || username ==='' || email ==='' || password === ''){
     next(errorHandler(400, "All fields are required"))
    
  }
try {
      // Check for existing user

      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return next(errorHandler(400, "Username already exists"));
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(errorHandler(400, "Email already exists"));
      }

  const hashedPassword = await bcryptjs.hash(password, 12)
  const user = new User({username, email, password:hashedPassword})
  
  await user.save();
  res.status(201).json("User created succeesfully")
  
} catch (error) {

  next(error)
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
}


export const signin = async (req, res, next) => {
  const {email, password} = req.body;
  if(!email || !password || email==='' || password ===''){
     next(errorHandler(480,'All fields are required'));

  }

try {
  const validUser = await User.findOne({email});
  if(!validUser){
    return next(errorHandler(404,'Invalid Credentials ! '))
  }

const validPassword = bcryptjs.compareSync(password, validUser.password);
if(!validPassword){
  return next(errorHandler(400,'Invalid Credentials ! '))
}
const token = jwt.sign({
  id:validUser._id},process.env.JWT_SECRET)
const {password:pass,...rest} = validUser._doc;
  res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest);

} catch (error) {
  next(error)
  
}
}