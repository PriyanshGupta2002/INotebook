const express=require('express')
const router=express.Router()
const Notes=require('../models/Notes')
const fetchuser=require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const res = require('express/lib/response');
const req = require('express/lib/request');
const { set } = require('mongoose');




// Route1-/api/notes/fetchallnotes
router.get('/fetchallnotes',fetchuser, async(req,res)=>{
    try {
        const notes=await Notes.find({user:req.user.id })
        res.json(notes) 
    } catch (error) {
        res.status(500).json({error:"Some internal server error occured"})
        
    }

})


// Route2- post request to add notes  /api/notes/makenotes
router.post('/makenotes',fetchuser,[
    body('title','Enter a valid title').exists().isLength({min:3}),
    body('description','Enter a valid description').exists().isLength({ min: 5 }),
    body('tag','Enter a tag').isLength({ min: 2 })
], async(req,res)=>{
    try {
        
    
    const {title,description,tag}=req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note=new Notes({
        title,description,tag,user:req.user.id
    })
    const savednotes=await note.save()
    res.json(savednotes)
} catch (error) {
        res.status(500).json({error:"Some internal server error occured"})
}
})



// Route3- post request to update an existing note  /api/notes/update Login-required
router.put('/update/:id',fetchuser, async(req,res)=>{
  const {title,description,tag}=req.body
  let newNote={title:"",description:"",tag:""}
  try {
      
  
  if (title) {
      newNote.title=title
  }
  if (description) {
      newNote.description=description
  }
  if (tag) {
      newNote.tag=tag
  }

let note=await Notes.findById(req.params.id)
 if (!note) {
     res.status(404).send('Not found ')
 }
 if (note.user.toString()!==req.user.id) {
     res.status(401).send("Not allowed")
 }
note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
res.json(note)
} catch (error) {
    res.status(501).json({error:"Some internal server error occured"})
      
}
})




// Route4- delte request to delete an existing note  /api/notes/delete Login-required
router.delete('/delete/:id',fetchuser, async(req,res)=>{
let note=await Notes.findById(req.params.id)
try {
    

 if (!note) {
     res.status(404).send('Not found ')
 }
 if (note.user.toString()!==req.user.id) {
     res.status(401).send("Not allowed")
 }
note=await Notes.findByIdAndDelete(req.params.id)
res.json({'Success':"Your note has been deleted",note:note})
} catch (error) {
    res.status(501).json({error:"Some internal server error occured"})
}
})
module.exports=router