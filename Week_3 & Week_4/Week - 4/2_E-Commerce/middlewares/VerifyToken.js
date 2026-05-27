import jwt from 'jsonwebtoken'


export function ValidateToken(req,res,next){
    // get the token from req
    let token = req.cookies.token;
    if(!token){
        res.status(401).json({message:"Login First"});
    }

    // the token is present now we need to validate the token
    let decodedToken = jwt.verify(token,process.env.SECRET);

    console.log("decoded Token: ", decodedToken);
}