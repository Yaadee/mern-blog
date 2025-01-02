import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {type: String,required: true, unique: true,
      match:[/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,"Please enter a valid email address"],
    },
    password: { type: String, required: true, minlength: 6,
     match :[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,"Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"]
     },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
