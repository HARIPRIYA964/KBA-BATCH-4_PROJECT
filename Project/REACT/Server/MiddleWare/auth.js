import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()

const authenticate =(req,res,next)=>{
    const cookie = req.headers.cookie;
    console.log(cookie);
    if(cookie){
        const [name,token] = cookie.trim().split('=');
        console.log(name)
        console.log(token)
    
    if(name=='Token'){
       const verified = jwt.verify(token,process.env.SECRET_KEY)
       console.log(verified)
       req.user_id = verified._id;
       req.email = verified.email;
       req.userType = verified.userType;
       console.log(req.user_id)
       console.log(req.email);
       console.log(req.userType );
       
       next();     //go to next function
       //break;
    }
    else{
        res.status(401).json({message:" Unauthorized access"});
    }}
    else{
        res.status(401).json({message:'unauthorized'})
    }
    
    
}
export default authenticate

