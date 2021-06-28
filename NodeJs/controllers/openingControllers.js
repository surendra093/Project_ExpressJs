const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {opening} = require('../models/opening')

router.get('/', (req,res)=>{
         opening.find((err,docs)=>{
            if(!err){
               res.send(docs);
           }
           else{
                console.log('Error in retriving Opening :'+JSON.stringify(err,undefined,2));
           }
         });
});

router.get('/:id', (req,res)=>{
     
      if(!ObjectId.isValid(req.params.id))
             return res.status(400).send(`No record with given id : ${req.params.id}`);
      opening.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.send(doc);
          }
          else{
           console.log('Error in retriving Opening:'+JSON.stringify(err,undefined,2));
          }
       });
});


router.post('/', (req,res)=>{
       var job = new opening({
            jobtitle        : req.body.jobtitle,
            location        : req.body.location,
            EmployementType : req.body.EmployementType,
            Eligibility     : req.body.Eligibility,
            Work            : req.body.Work,
            Note            : req.body.Note,
            skills          : req.body.skills
       });
       job.save((err,doc)=>{ 
           if(!err){
             res.send(doc);
           }
           else{
            console.log('Error in saving opening:'+JSON.stringify(err,undefined,2));
           }
       });
});


router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var job = {
            jobtitle        : req.body.jobtitle,
            location        : req.body.location,
            EmployementType : req.body.EmployementType,
            Eligibility     : req.body.Eligibility,
            Work            : req.body.Work,
            Note            : req.body.Note,
            skills          : req.body.skills
       };
       opening.findByIdAndUpdate(req.params.id,{$set:job},{new:true},(err,doc)=>{
            if(!err){
                res.send(doc);
            }
            else{
            console.log('Error in opening update:'+JSON.stringify(err,undefined,2));
            }
       });
});

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    opening.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in deleting oopening:'+JSON.stringify(err,undefined,2));
        }
    });
       

});

module.exports = router;