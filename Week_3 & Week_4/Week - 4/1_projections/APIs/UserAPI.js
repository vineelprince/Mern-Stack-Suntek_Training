import express from 'express';
import {UserModel} from '../models/UserModel.js'
import {hash, compare} from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { verfyToken } from '../middlewares/verifyToken.js'

export const userApp = express.Router();

// test routes
// userApp.get('/test',(req,res)=>{
//     res.json({message:"Test route"})
// })


// User API route


// Read user
userApp.get('/users',async(req,res)=>{
    // read users from database
    let usersList = await UserModel.find({},{username:1,_id:0,age:1});
    res.status(200).json({message:"users",payload:usersList})
})

// Read user by objectID
userApp.get('/users/:id',async (req,res)=>{
    let givenId = req.params.id;

    let findObj = await UserModel.findById(givenId);
    // console.log(findObj);
    res.status(200).json({message:"user by id",payload:findObj})
})

// create user
userApp.post('/users',async(req,res)=>{
    // get new user from req
    let newUser = req.body;
    //  hash the password 
    //  replace plain password with hashed password
    let hashedPassword = await hash(newUser.password,12)
    newUser.password = hashedPassword;
    // console.log(newUser)
    // create a new user document
    let newUserDoc = new UserModel(newUser)
    // console.log(newUserDoc);
    await newUserDoc.save();
    res.status(201).json({message:"user Created"})
    
})

// user authentication(login) route
userApp.post('/auth',async(req,res)=>{
    // get user cred obj;
    let {username,password} = req.body;
    // check for username
    let userOfDB = await UserModel.findOne({username:username})
    // if user not found
    if(userOfDB===null){
        return res.status(404).json({message:"Invalid username"})
    }
    // compare password
    let status = await compare(password,userOfDB.password);
    // if password not matched 
    if(status===false){
        return res.status(404).json({message:"Invalid password"})
    }

    // create signed token
    let signedToken = jwt.sign({username:username},'abcdef',{expiresIn:30})
    // // send token in res
    // res.status(200).json({message:"login success",token:signedToken}); // this is mistake we should not send as res

    // save token as httpOnly cookie

    res.cookie('token',signedToken,{
        httpOnly:true,// it is httpOnly cookie
        secure:false,
        sameSite:"lax"
    }) 
    
    res.status(200).json({message:"login success"})
    
})

// update 
userApp.put('/users/:id',async(req,res)=>{
    // taking out the id object id from params
    
    let givenId = req.params.id;

    // get modified user from req
    let modifiedUser = req.body;
    // make update
    let latestUser = await UserModel.findByIdAndUpdate(givenId,{$set:{...modifiedUser}},{new:true,runValidators:true})

    // send res

    res.status(200).json({message:"user modified",payload:latestUser});

})
// delete
userApp.delete('/users/:id',async(req,res)=>{
    // get object id from url params
    let givenId = req.params.id;
    let deletedUser = await UserModel.findByIdAndDelete(givenId);
    res.status(200).json({message:"user removed",payload:deletedUser});
})


// test route (protected)
userApp.get('/test' , verfyToken,(req,res)=>{
    res.json({message:"test route"});
})
