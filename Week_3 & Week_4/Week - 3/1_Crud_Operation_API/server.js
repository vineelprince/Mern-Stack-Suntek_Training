// Create HTTP Server
// import express module
import express from 'express'

// create server
const app = express();
// assign the port number to the server
app.listen(3000,()=> console.log('HTTP server listening on the port 3000'));





// how to create custom middleware

function middleware1(req,res,next){
    console.log("middleware 1 executed");
    // res.json({message:"res from middleware"})
    // forward the req to next middleware
    next();
    
}

function middleware2(req,res,next){ // this will only be used by post request
    console.log("middleware 2 executed");
    // res.json({message:"res from middleware"})
    // forward the req to next middleware
    next();
    
}
// to execute this middleware for every request (incoming)
app.use(middleware1);

// body parsing middleware
app.use(express.json());
//  create API --> handle the request so it will contain the req handlers
//  so we need to create routes

// test local in memory data
let users = [];

// product will be like 
// productId,name,price,brand
let products = [];
//  get request handing route (read users)
app.get('/users',(req,res)=>{
    // send users data in res
    res.status(200).json({message:"all users data",payload:users}) // message,payload
})
// post req handling route (post user)
app.post('/users',middleware2,(req,res)=>{
    // create a new user
    let newUser = req.body;
    // console.log("new user",newUser);
    // insert new user to user array
    users.push(newUser);
    res.status(201).json({message:"User created successfully"})
    
})
// put req handling route (update user)
app.put('/users/id',(req,res)=>{
    // updating the user
    // get the modified user
    let modifiedUSer = req.body;
    // console.log(modifiedUSer);
    // find the user with id exists in array 
    // if user not found send res as user not found
    // if user found then modify the user
    // send res as "user modified"
    let checkIfExist = users.findIndex((user) => user.id === modifiedUSer.id);
    if(checkIfExist === -1){
        res.status(404).json({message:"User Not Found"})
    }
    else{
        let delUser = users.splice(checkIfExist,1,modifiedUSer);
        // console.log(delUser);
        res.status(200).json({message:"User updated successfully"})
    }
})


// read user by id
app.get('/users/:id',(req,res)=>{
    // read id from url parameter
    // console.log(req.params);
    
    let userid=Number(req.params.id)  // {id: 100}
    // console.log(id);
    let user=users.find((user)=>user.id===userid);
    if(!user) return res.status(404).json({message:"user not found"});
    res.status(200).json({message:"user",payload:user})
})

// delete req handling route (delete user)
app.delete('/users/:id',(req,res)=>{
    // getting the user id from params
    let userId = Number(req.params.id);
    let user = users.findIndex((obj)=>obj.id===userId);
    if(user === -1) return res.json({message:"user not found"})
    let deletedUser = users.splice(user,1);
    res.json({message:"Deleted Successfully",payload:deletedUser})
    
})

app.get('/products',(req,res)=>{
    // sending all the products
    res.status(200).json({message:"products",payload:products})
})

app.get('/products-id/:id',(req,res)=>{
    // getting the product id then find the prodcut and send as payload
    let prdId = Number(req.params.id);
    let finPrd = products.find((prd)=>prd.productId==prdId);
    if(!finPrd) return res.status(404).json({message:"product not found"})
    res.status(200).json({message:"product",payload:finPrd});
})

// getting all the products of a particular brand
app.get('/products-brand/:brand',(req,res)=>{
    let givenBrand = req.params.brand;
    let allProductsWithBrand = products.filter((prd)=>prd.brand===givenBrand);
    if(!allProductsWithBrand) return res.status(404).json({message:"no product found"});
    res.status(200).json({message:"products",payload:allProductsWithBrand});
})

app.post('/products',(req,res)=>{
    // getting the product from body
    let prd = req.body;
    products.push(prd);
    res.status(201).json({message:"product added"});
})
// updating the product with id
app.put('/products/:id',(req,res)=>{
    let newPrd = req.body;
    let finPrd = products.findIndex((prdt)=>Number(req.params.id)===prdt.productId);
    if(finPrd === -1) {
        return res.status(404).json({message:"product not found"});
    }
    products.splice(finPrd,1,newPrd)
    res.status(200).json({message:"product updated successfully"});
})

// delete a product by id
app.delete('/products/:id',(req,res)=>{
    let prdId = Number(req.params.id);
    let finPrd = products.findIndex((prd)=>prd.productId===prdId);
    if(finPrd==-1){
        return res.status(404).json({message:"product not found"});
    }
    products.splice(finPrd,1);
    res.status(200).json({message:"product deleted successfully"});
})