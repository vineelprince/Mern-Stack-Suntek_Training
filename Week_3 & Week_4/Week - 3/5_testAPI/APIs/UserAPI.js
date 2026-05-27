// create the mini express application

import express from "express"
import { UserModel } from '../models/UserModel.js'

export const userApp = express.Router()
// we have crearted the mini express or separate route application 

// let users = [] // with this we were able to get the data 
// now we have to fetch the data from mongoDB
userApp.get('/users',async (req,res)=>{
    let data = await UserModel.find();
    res.status(200).json({message:"All users",payload:data});
})

// get the user by id
userApp.get('/users/:id',async(req,res)=>{
    let givenId = req.params.id;
    let findUser = await UserModel.findById(givenId);
    if(findUser){
        res.json({message:"finding the user by id",payload:findUser})
    }
    res.json({message:"No user with the given Id found"})
})

userApp.post('/users',async(req,res)=>{
    // collect or retrive or extract the data coming in the request
    let givenData =req.body;
    // console.log(givenData);
    let newUserDoc = new UserModel(givenData);
    await newUserDoc.save();
    res.status(201).json({message:"user Created"})
})

// put request handler
userApp.put('/users/:id',async(req,res)=>{
    let givenId = req.params.id;
    let modifiedUser = req.body;
    let latestUser = await UserModel.findByIdAndUpdate({_id:givenId},{$set:{...modifiedUser}},{new:true,runValidators:true})
    res.status(200).json({message:"user updated",payload:latestUser})
})

// delete request handler
userApp.delete('/users/:id', async(req,res)=>{
    let givenId = req.params.id;
    let deletedUser = await UserModel.findByIdAndDelete(givenId);
    res.status(200).json({message:"the user is deleted successfully",payload:deletedUser})
})