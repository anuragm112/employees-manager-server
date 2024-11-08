const bcrypt=require('bcryptjs');
const User=require('../models/User');
const jwt=require('jsonwebtoken');
const SECRET_KEY= process.env.SECRET_KEY || 8687996969;


const signupController = async (req, res) => {
    try {
      const { f_userName, f_email, f_Pwd } = req.body;
      if (!f_userName || !f_email || !f_Pwd) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const existEmail = await User.findOne({ f_email });
      if (existEmail) {
        return res.status(409).json({ message: "Email is already in use" });
      }
  
      const bcryptPassword = await bcrypt.hash(f_Pwd, 10);
      const newUser = await User.create({
        f_userName: f_userName,
        f_email: f_email,
        f_Pwd: bcryptPassword
      });
      await newUser.save();
  
      return res.status(201).json({ message: "User Created Successfully" });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };
  

  const loginController = async (req, res) => {
    try {
      const { f_userName, f_Pwd } = req.body;
      if (!f_userName || !f_Pwd) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const user = await User.findOne({ f_userName });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const matchPassword = await bcrypt.compare(f_Pwd, user.f_Pwd);
      if (!matchPassword) {
        return res.status(401).json({ message: "Incorrect Password" });
      }
  
      const token = jwt.sign({ userId: user._id }, SECRET_KEY);
      return res.status(200).json({ message: "User Login Successful", token, user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  

module.exports={signupController,loginController};