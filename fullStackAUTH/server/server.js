var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var ejs = require("ejs");
var path = require("path");
var expressJwt = require("express-jwt");

//import config
var config = require("./config.js");

//get port number
var port = process.env.Port || 8070;

//setup mongoose connection
mongoose.connect('mongodb://localhost/posts');

//setup base express app
var app = express();

//setup app to handle json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//setup static files
app.use(express.static(path.join(__dirname + "/../public")));
app.set("views", __dirname + "/../public/views");

//setup server to handle html
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");

//import routes
var apiRouter = require("./routes/api.js");
var fileRouter = require("./routes/file.js");
var authRouter = require("./routes/auth.js");
var chattingRouter = require("./routes/chatting.js")

app.use("/posts", expressJwt({"secret": config.secret}));

app.use("/auth", authRouter);
app.use("/posts", apiRouter);
app.use('/chatting', chattingRouter);
app.use("/", fileRouter);

app.listen(port, function() {
  console.log("I am listening on port " + port);
});
