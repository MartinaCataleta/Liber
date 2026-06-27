const jwt = require("jsonwebtoken")

function verifyToken(req,res,next){
 
    const token = req.cookies?.accessToken;
    if(!token){
        return res.status(401).json({message: "Not Valid or Missing Token: Unauthorized"});
    }
    try{
        const decoded= jwt.verify(token,process.env.JWT_SECRET)
       
        req.user = { id: decoded.userId };

        next();
    }catch(error){
     return res.status(401).json({ message: 'Unauthorized: Invalid token' });  
    }
}

module.exports = verifyToken;
     


