import jwt  from "jsonwebtoken";

const verifyToken = (req,res,next)=>{
    const token = req.cookies.acessToken
if(!token){
    return res.status(401).json({sucess:false,message:"Not Allowed"})
}
 
jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
    if(err){
        return res.status(401).json({sucess:false,message:'Invalid Token'})
    }
    req.user = user
    next()
})


}

export const verifyUser = (req,res,next) =>{
    verifyToken(req,res,next,()=>{
        if(req.user.id === req.params.id || req.user.role === "ADMIN"){
            next()
        }else{
            res.status(401).json({sucess:false,message:"Not Authenticated"})
        }
    })
}