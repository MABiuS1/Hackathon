const mongoose = require("mongoose");
const router = require("router");

const majorSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
})

module.exports = mongoose.model('Major',majorSchema)

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