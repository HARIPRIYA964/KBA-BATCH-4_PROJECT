import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../Models/userModel.js";
import { Profile } from "../Models/userModel.js";
import authenticate from "../MiddleWare/auth.js";


dotenv.config();

const userroute = Router()

userroute.post("/signup", async (req, res) => {
    try {
      // const {} = userDetails
      const {firstname,lastname, email, password} = req.body;
      
      const newPassword = await bcrypt.hash(password, 10);
      const found = await User.findOne({userType:'admin'})
     
      let userType = 'user'
      if(!found){
       userType='admin'
      }
      const result = await User.findOne({email:email})
 
      if(result){
         res.status(400).json({message:"User already exists"})
        console.log(result);
      }
      else{
        const user = new User({
          firstname,
         lastname ,
        email,
        password:newPassword,
        userType 
  
        })
        await user.save()
        
        const newProfile = new Profile({
          userId: user._id,
          firstname,
          lastname,
          email,
          date: "N/A",  // Temporary placeholder
          age: "N/A",   // Temporary placeholder
          gender: "N/A",
          height: "N/A",
          weight: "N/A",
          ProfileImage: "default.jpg",
      });

      await newProfile.save();
        
 
        res.status(200).json({message:"signup successfully"})
      }
    } catch (error) {
      console.log("err", error);
      res.status(500).json({ error: "signup is failed" });
    }
  });

userroute.post('/login',async(req,res)=>{
    try {
        const {email,password} = req.body;
        const result = await User.findOne({email:email});
        console.log(result)
        if(!result){
            return res.status(400).json({message:"User does not exist"});
            }
            else{
                const ismatch = await bcrypt.compare(password,result.password);
                
                if(ismatch){   
                    const token = jwt.sign({_id: result._id,email:email,userType:result.userType},process.env.SECRET_KEY,{expiresIn:'7d'})
                   
                    res.cookie('Token',token,{
                        httpOnly:true,
                    })
                    res.status(200).json({message:"User Login successfully",userType: result.userType,email: result.email});
                    console.log(token);   
                    return(result)     
                    
                    
                    }
                    else{
                        return res.status(400).json({message:"Invalid Password"});
                        }   
                        }
                        } catch (error) {
                            res.status(500).json({message:"Internal Server Error"});
                            console.log(error)
                            }

})

userroute.get('/logout', (req, res) => {
  res.clearCookie('Token', { httpOnly: true, secure: true, sameSite: 'Strict' });
  res.status(200).json({ message: "User logged out successfully" });
});

userroute.get('/getuser', authenticate, async (req, res) => {
  try {
      const user = await User.findById(req.user_id).select('-password'); // Fetch user by ID and exclude password
      if (user) {
          res.json(user);
      } else {
          res.status(404).send("User not found");
      }
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).send("Server error");
  }
});
export {userroute}