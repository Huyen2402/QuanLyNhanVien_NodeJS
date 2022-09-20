const express = require("express");
const cors = require("cors") ;
const { json } = require("express");
const app = express();
const contactRouter = require("./app/route/contact.route");
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactRouter);
app.get("/",(req, res ) =>{
    res.json({message: "Welcome to contact book application."});
});
module.exports = app;