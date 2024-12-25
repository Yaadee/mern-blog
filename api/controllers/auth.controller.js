import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'

export const signup = async (req, res, next) => {
  const {username, email, password} = req.body

  if(!username || !email || !password || username ==='' || email ==='' || password === ''){
     res.status(400).json({
      message :"All fields are required to create account"
    })
  }
try {
  const hashedPassword = await bcryptjs.hash(password, 12)
  const user = new User({username, email, password:hashedPassword})
  await user.save();
  res.status(201).json("User created succeesfully")
  
} catch (error) {
  if(error.code ===11000) res.status(409).json("User already exist with this username or email ")
  
  next(error)
  
}
}