const express = require('express');
const router = express.Router();
const MajorModel = require("../models/major")


router.get('/',async (req,res) => {
    try {
        const major = await MajorModel.findById(req.params.id);
        res.status(404).json({message : "Canot Find Major"})
        }catch (err){
                console.error(err.message)
                res.status(500).json({message : err.message})

            }
});

module.exports = router;