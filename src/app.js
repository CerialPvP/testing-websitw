require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+"/index.html"))
})


app.listen(process.env.PORT, () => {
    console.log(`The app is ready on port ${process.env.PORT}`)
})