// creating the http server
import express from "express"
import {connect} from "mongoose"
import {userApp} from './APIs/UserAPI.js'

const app = express();
const port = 4000;
async function connectDB(){
    try{
        await connect("mongodb://localhost:27017/anuragdb")
        console.log("database connected successfully");
        app.listen(port,()=> console.log(`Server listening to port at ${port}`))
        
    }
    catch(err){
        console.log("Error connecting to DB");
        
    }
}

connectDB();

app.use(express.json())
app.use('/user-api',userApp);
// app.use('/product-api',productApp)
