const jwt = require('jsonwebtoken');
const JWT_SECRET="PriyanshIsAWe$BDevElOPe€r"


const fetchuser=(req,res,next)=>{
let token=req.header('auth-token')

if (!token) {
    res.status(401).json({error:"Please authenticate with the correct token"})
}   
try {
    const data=jwt.verify(token,JWT_SECRET)
    req.user=data.user    
    next()
} catch (error) {
res.send(401).json({error:"Please authenticate with the correct token"});    
}
}

module.exports=fetchuser;