const express = require('express');
const router = express.Router();
const StudentModel = require("../models/student")

router.get('/',async (req,res) => {
    try {
        const students = await StudentModel.find().populate({path : 'major'});
        res.status(200).json({data : students}) 
    }catch (err){
        console.error(err.message)
        res.status(500).json({message : err.message})
    }
});

async function getStudent(req,res,next) {
    let student;
    try{
        student = await Studentmodel.findById(req.params.id).populate({path : 'major'});
        if (!student){
            return res.status(400).json({message : "cannot Find student"})
        }
    }catch (err){
        let message = err.message;
        let code = 500;
        if(err.name = "CastError"){
            message = "Data Not Found";
            code = 400;
        }
        console.error(err.message)
        return res.status(code).json({message : message})

    }
    req.student = student;
    next();
}

router.get('/:id',getStudent,async (req,res) => {
    res.status(200).json({data : req.student})
});

router.post('/',async (req,res) => {
    try{
        const newStudents = await StudentModel.create(req.body);
        res.status(201).json({data : newStudents})
    }catch (err){
        if(err.code === 11000){
            const keys = Object.keys(err.keyValue);
            err.message = 'This ${keys.toString()} is already taken.'
        }
        console.error(err.message)
        res.status(500).json({message : err.message})
    }
})

router.put('/:id',async (req,res) => {
    const stuID = req.params.id
    try {
        const updatedStudents = await StudentModel.findByIdAndUpdate(stuID,req.body,{
            new : true,
            runValidators : true
        });
        res.json({data : updatedStudents})
    }catch (err){
        console.error(err.message)
        res.status(400).json({message : err.message})
    }
})

router.delete('/:id',getStudent,async (req,res) => {
    const stuRemove = req.student
    try {
        await stuRemove.remove();
        res.json({message : "Delete Student Successful",data:{}})
    }catch (err){
        console.error(err.message)
        res.status(500).json({message : err.message})
    }
})

module.exports = router;