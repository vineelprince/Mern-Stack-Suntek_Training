// creating the mini express application

import express from 'express'
import {hash, compare} from 'bcryptjs'
import { UserModel } from '../models/UserModel.js';
import jwt from 'jsonwebtoken'
import { ProductModel } from '../models/ProductModel.js';
// import {Types} from 'mongoose'

export const userApp = express.Router()

// create user
userApp.post('/users',async(req,res)=>{
    // getting the new user
    let newUser = req.body;
    // validate new user
    await new UserModel(newUser).validate()
    // try{
    //     new UserModel(newUser).validate()
    // }
    // catch(err){
    //     console.log(err.message);
    // }
    // hashing the password
    let hashedPassword = await hash(newUser.password,12);
    newUser.password = hashedPassword;

    // making new doc for the user
    let newUserDoc = new UserModel(newUser);

    // saving this doc
    await newUserDoc.save({validateBeforeSave:false});

    res.status(201).json({message:"user created",payload:newUserDoc})
    
})

// Login
userApp.post("/auth",async(req,res)=>{
    // let the user credentials from the request
    let {name,password} = req.body;
    console.log(name,password)
    let findUsername = await UserModel.findOne({name:name});
    if(!findUsername){
        return res.status(401).json({message:"user not found"});
    }
    let status = await compare(password,findUsername.password);

    if(status===false){
        return res.status(404).json({message:"Wrong Password"})
        
    }

    // creating the token for this user
    let signedToken = jwt.sign({name:name},process.env.SECRET,{expiresIn:300})

    // we should not send the token as a res
    // we should only save it to httponly cookie

    res.cookie('token',signedToken,{
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    })

    res.status(200).json({message:"login success"})
})


// add products to user's cart

// userApp.put('/user-cart/user-id/:uid/product-id/:pid',async(req,res)=>{
//     // getting the user-id and product-id from the url params
//     let userId = req.params.uid;
//     let productId = req.params.pid;
//     // perform the update so need to check if user exist or not and then product exist or not
//     // check user
//     let user = await UserModel.findById(userId);
//     if(!user){
//         return res.status(401).json({message:"user not found"});
//     }
//     let product = await ProductModel.findById(productId);
//     if(!product){
//         return res.status(401).json({message:"product not found"});
//     }
//     // storing the product id in the user cart
//     // perform update
//     // let modifiedUser = await UserModel.updateOne({_id:userId},{$push:{"cart":{"product.productName":productId}}})
//     // res.status(200).json({message:"Item Added to cart"})
//     let checkPrdExistInCart = await UserModel.findById(userId)
//     let modifiedUser = await UserModel.findByIdAndUpdate(userId,
//         {
//             $push:{cart:{product:productId}}
//         },
//         {new:true}
//     ).populate("cart.product","productName price")
//     res.status(200).json({message:"cart updated",payload:modifiedUser})
// })


// userApp.put('/user-cart/user-id/:uid/product-id/:pid',async(req,res)=>{
//     // getting the user-id and product-id from the url params
//     let userId = req.params.uid;
//     let productId = req.params.pid;
//     // perform the update so need to check if user exist or not and then product exist or not
//     // check user
//     let user = await UserModel.findById(userId);
//     if(!user){
//         return res.status(401).json({message:"user not found"});
//     }
//     let prdt = await ProductModel.findById(productId);
//     if(!prdt){
//         return res.status(401).json({message:"product not found"});
//     }
//     // storing the product id in the user cart
//     // perform update
//     // let modifiedUser = await UserModel.updateOne({_id:userId},{$push:{"cart":{"product.productName":productId}}})
//     // res.status(200).json({message:"Item Added to cart"})
//     let checkPrdExistInCart = await UserModel.findById(userId);
//     checkPrdExistInCart = checkPrdExistInCart.cart;
//     console.log(checkPrdExistInCart)
    
//     // console.log(typeof(checkPrdExistInCart))
//     // let ObjPrdID = new Types.ObjectId(productId);
//     // console.log(ObjPrdID);
    
    
//     let ifExist = checkPrdExistInCart.find((obj)=>{
//          console.log(obj);
//          console.log(productId)
//         // return obj;
//         if(obj.product.equals(productId)|| obj.quantity===0){
//             return obj;
//         }
        
//     });
//     console.log(ifExist);
    
//     let modifiedUser;
    
//     if(!ifExist) {
//         console.log("product is not in cart adding now")
//         modifiedUser = await UserModel.findByIdAndUpdate(userId,
//         {
//             $push:{cart:{product:productId,quantity: 1}}
//         },
//         {new:true}
//         ).populate("cart.product","productName price")
//     }
//     else{
//         console.log("product exist incrementing the cnt")

//         modifiedUser = await UserModel.findByIdAndUpdate(userId,
//         {cart:{$inc:{quantity:1}}}
        
//     ).populate("cart.product","productName price")
        
//     }
    
//     res.status(200).json({message:"cart updated",payload:modifiedUser})
// })









userApp.put('/user-cart/user-id/:uid/product-id/:pid',async(req,res)=>{
    // getting the user-id and product-id from the url params
    let userId = req.params.uid;
    let productId = req.params.pid;
    // perform the update so need to check if user exist or not and then product exist or not
    // check user
    let user  = await UserModel.findById(userId);
    if(!user){
        return res.status(404).json({message:"user not found"})
    }

    let prd  = await ProductModel.findById(productId);
    if(!prd){
        return res.status(404).json({message:"product not found"})
    }

    let cart = user.cart;

    let ifExistId = cart.findIndex((obj)=>obj.product.equals(productId))

    // console.log(ifExistId)
    let modifiedUser;
    if(ifExistId===-1){
        // this means that the product is not in the cart
        modifiedUser = await UserModel.findByIdAndUpdate(userId,
            {$push:{cart:{product:productId,quantity:1}}},
            {new:true,runValidators:true}
        )
    }
    else{
        // the product is already present in the cart
        let qt = cart[ifExistId].quantity;
        // modifiedUser = await UserModel.findOneAndUpdate(
        //     {_id: userId,"cart.product":productId},
        //     {$set:{"cart.$.quantity":qt+1}},
        //     {new:true}
        // )

        modifiedUser = await UserModel.findOneAndUpdate(
            {_id:userId,"cart.product":productId},
            {$inc:{"cart.$.quantity":1}},
            {new:true}
        )
    }
    
    res.status(200).json({message:"cart updated",payload:modifiedUser})
})








// Reading the user data with alll the information about the user and all the cart items with details not only references

userApp.get('/users/:id', async(req,res)=>{
    // reading the user id with from params
    let uid = req.params.id;

    let userList = await UserModel.findById(uid).populate("cart.product","productName price");
    // console.log(userList);

    res.status(200).json({message:"Users details",payload:userList})
})