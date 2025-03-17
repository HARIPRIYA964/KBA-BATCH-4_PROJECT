import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()

const authenticate =(req,res,next)=>{
    const cookie = req.headers.cookie;
    console.log(cookie);
    const [name,token] = cookie.trim().split('=');
    console.log(name)
    console.log(token)
    if(name=='Token'){
       const verified = jwt.verify(token,process.env.SECRET_KEY)
       console.log(verified)
       req.email = verified.email;
       req.userRole = verified.userRole;
       console.log(req.email);
       console.log(req.userRole );
       
       next();     //go to next function
       //break;
    }
    else{
        res.status(401).json({message:" Unauthorized"});
    }
    
}
export default authenticate