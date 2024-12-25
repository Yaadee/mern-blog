import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

  const PORT = process.env.PORT || 3000;


app.listen(3000, () => {
  console.log(`Server is connected to and running on ${PORT}`);
});
app.use(express.json());
app.use("/api/user", userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) =>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error ';
  res.status(statusCode).json({
    success:false, statusCode,
    message});
}
)