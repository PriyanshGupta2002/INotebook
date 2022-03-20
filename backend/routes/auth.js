const { body, validationResult } = require('express-validator');
const express=require('express')
const User = require('../models/User')
const router=express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const req = require('express/lib/request');
const res = require('express/lib/response');
const fetchuser=require('../middleware/fetchuser')





const JWT_SECRET="PriyanshIsAWe$BDevElOPe€r"

// Creating a new user without login /api/auth/createUser
// Route1: /api/auth/ucreateUser
router.post('/createUser',[
    body('email','Please enter a valid email').isEmail(),
    body('name','Please enter a valid name').isLength({ min: 2 }),
    body('password','Password must be 5 characters long').isLength({ min: 5 })
],async (req,res)=>{
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Checks wether the user with same email already exists
    try {
      
      let user = await User.findOne({email:req.body.email})
      if(user){
        success=false
        return res.status(400).json({success,error:"Sorry a user with the same email exists"})
      }


      let salt =  await bcrypt.genSaltSync(10);
      let secPass= await bcrypt.hash(req.body.password,salt) 
        user=await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
        })
        const data={
          user:{
            id:user.id
          }
        }
      const authToken=jwt.sign(data,JWT_SECRET)
      success=true
      res.json({success,authToken})
      }
      catch (error) {
      console.error(error.message)
      res.status(500).send("Some internal server error occured")
      } 
        
    })

 




    //Route 2-/api/auth/login
    //  Authenticate a user without login 
  router.post('/login',[
    body('email','Please enter a valid email').isEmail(),
    body('password','Password cannot be empty').exists()
],async (req,res)=>{
  let success=false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const{email,password}=req.body
  try {
    let user= await User.findOne({email})
    if(!user){
      return res.status(400).json({success,error:"Please try to login with correct credentials"})
    }  

    const passCompare=await bcrypt.compare(password,user.password)
    if(!passCompare){
      
      return res.status(400).json({success,error:"Please try to login with correct credentials"})
    }
    const data={
      user:{
        id:user.id
      }
    }
    const authToken=jwt.sign(data,JWT_SECRET)
    success=true
    res.json({success, authToken})
  } catch (error) {
     console.error(error.message)
      res.status(500).send("Some internal server error occured")
  }
})


// Route3-/api/auth/getUser
router.post('/getuser',fetchuser,async (req,res)=>{



try {
  
let userId=req.user.id
const user=await User.findById(userId).select("-password")
res.send(user)
} catch (error) {
  console.error(error.message)
  return res.status(500).send("Some internal server error occured")
}

})


module.exports=router