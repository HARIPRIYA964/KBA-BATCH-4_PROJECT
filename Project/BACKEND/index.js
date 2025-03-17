import express,{json} from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { userroute } from './Routes/UserRoute.js'
import { userauth } from './Routes/Userauth.js'

dotenv.config()


const port = process.env.PORT 
const app = express()
app.use(json())
app.use('/',userroute)
app.use('/',userauth)

mongoose.connect('mongodb://localhost:27017/Fitness_Tracker').then(()=>{
    console.log('MongoDB connected succesffully to fitness tracker');
    
})
.catch((err)=>{
    console.log('MongoDB connection failed',err);
    })

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
    