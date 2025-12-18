const express = require("express");
const transactionRouter = require("./Routes/ExpenseRoute");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./config/db");
const bodyParser = require("body-parser");
const authenticationRouter = require("./Routes/auth");
// Load environment variables from the server/.env file
dotenv.config();

connectDB();
const app = express();
const PORT = process.env.PORT || 8000;

// Configure Cross-Origin Resource Sharing - must be before bodyParser middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(bodyParser.json());

app.use("/auth", authenticationRouter);
app.use("/expense", transactionRouter);
app.get("/",(req,res)=>{
  res.json({msg:"SERVER IS READY TO USE"})
})
app.listen(PORT, () => {
  console.log(`Server Started ${PORT}`);
});
