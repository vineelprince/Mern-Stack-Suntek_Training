import jwt from "jsonwebtoken"
export function verfyToken(req,res,next){
    // verify token logic

    // 1. get token from req
    // console.log(req.cookies); // {token:""}
    let signedToken = req.cookies.token;
    if(!signedToken){
        return res.status(401).json({message:"please login first"})
    }
    
    // 2. verify token(decode)
    let decodedToken = jwt.verify(signedToken,'abcdef')

    console.log("decoded Token",decodedToken);

    next()
    
}