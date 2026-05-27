import express from 'express'
import {connect} from 'mongoose'
import {config} from 'dotenv'
import {userRoute} from './APIs/UserAPI.js'
import {adminRoute} from './APIs/AdminAPI.js'
import {authorRoute} from './APIs/AuthorAPI.js'
const app = express();

config() // process.env

// connect to db
const connectDB = async ()=>{
    try{
        await connect(process.env.MONGO_URL)
        console.log("DB connection success")
        app.listen(process.env.PORT,()=>{
            console.log("server Started Successfully")
        })
    }
    catch(err){
        console.log(err.message)
    }
}

app.use(express.json())
app.use('/user-api',userRoute);
app.use('/admin-api',adminRoute);
app.use('/author-api',authorRoute);

connectDB()



// default error handler

app.use((err,req,res,next)=>{
    console.log("error",err.message);
    res.status(500).json({message:"Error",error: err.message});
})