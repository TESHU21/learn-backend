import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";  // Import bcrypt for password hashing
import validator from "validator";  // Optional: For email validation

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Email format validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format!" });
    }

    // Check if the user already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);  // Hash password with salt rounds

    // Create the user
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      loggedIn: false
    });

    // Respond with success message and user data
    res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: "Something went wrong during registration"
    });
  }
};
const loginUser=async(req,res)=>{
  try{
  const {email,password}=req.body;
  // check user
  const user=await User.findOne({email:email.toLowerCase()

  });
  if(!user){
    return res.status(400).json({message:"user not found"})
  }

}
catch(error){

}
  
}
export {registerUser}