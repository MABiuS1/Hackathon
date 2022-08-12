const express = require("express");
const routes = express.Router();

const MajorRoutes = require("./major");
const StudentRoutes = require("./student");

routes.use("/student",StudentRoutes);
routes.use("/majors",MajorRoutes);

module.exports = routes;


