const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes/index.js")

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false, limit: '50MB'}))
app.use(bodyParser.json({ limit: '50MB'}));
dotenv.config();


const PORT = process.env.HOST || 8000;

mongoose.connect(process.env.MONGO_HOST,{
    useNewUrlParser: true,
});

const db = mongoose.connection;

db.on('error',(err) => console.error(err));

db.once('open',() => console.log(`Connected Database at : ${db.host}`));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","X-Requested-With");
    next();
});

app.use(routes)

app.listen(PORT, () => {
    console.log(`Server Started ON PORT : ${PORT}`);
});