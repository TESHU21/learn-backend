import { User } from "../models/user.model.js";
const registerUser=async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        // basic validation
        if(!username||!email||!password){
            return res.status(400).json({message:"all fields are important !"})
        }
        // check if the user is already exist
        const existing=await User.findOne({email:email.toLowerCase()})
        if(existing){
            return res.status(400).json({message:"user already existed"})
        }
        // create user
        const user=await User.create({
            username,
            email:email.toLowerCase(),
            password,
            loggedIn:false
        })
res.status(201).json({message:"User Registered ",
    user:{id:user._id,email:user.email,username:user.username
        
    }})
        
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error",error:error.message})
    }
}
export  {registerUser}