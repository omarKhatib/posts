var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var ejs = require('ejs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/posts');    // localhost/dbName
var path = require("path");
var apiRouter=require("./api.js");
var fileRouter = require('./files.js');
var PORT = process.env.PORT || 8000;





app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());




//setup server to host static files
app.use(express.static(path.join(__dirname + "\\..\\public")));
app.set("views", __dirname + "\\..\\public\\views");

//setup server to handle html
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");


app.use('/posts',apiRouter);
app.use(fileRouter);


app.listen(PORT, function () {
    console.log("iam listing on " + PORT);
})