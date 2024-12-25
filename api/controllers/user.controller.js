import User from "../models/user.model.js";

export const getUser = async (req, res) => {
 const users = await User.find();
 res.status(200).json({success:true, count:users.length, data:users })
};
