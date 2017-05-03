var express = require("express");
var apiRouter = express.Router();

//import models
var data = require("../models/posts.js");

//import middleware
var userRouter = require("../middleware/userMiddle.js");
var adminPriv = require("../middleware/adminPriv.js");

apiRouter.use(userRouter);

//apiRouter.get("/", function(req, res) {
//  if(req.body.privilage == "admin") {
//    Todo.find({}, function(err, data) {
//      if(err) {
//        res.status(500).send({"message": "Err", err: err});
//      } else {
//        res.status(200).send({"message": "Here is the data", data: data});
//      }
//    });
//  } else {
//    Todo.find({username: req.body.username}, function(err, data) {
//      if(err) {
//        res.status(500).send({"message": "Err", err: err});
//      } else {
//        res.status(200).send({"message": "Here is the data", data: data});
//      }
//    });
//  }
//});


apiRouter.get("/", function (req, res) {  
    
    data.find({}, function (err, data) { //get user's posts
        if (err) {
            res.status(500).send({
                message: 'internal server error'
            });

        } else {

            res.status(200).send({
                data: data
            });

        }





    });


});

apiRouter.get("/:username", function (req, res) {  
    
    data.find({username: req.params.username}, function (err, data) { //get user's posts
        if (err) {
            res.status(500).send({
                message: 'internal server error'
            });

        } else {

            res.status(200).send({
                data: data
            });

        }





    });


});




apiRouter.get("/:id", function (req, res) {
    data.findOne({
        _id: req.params.id
    }, function (err, data) {
        if (err) {
            res.status(500).send({
                message: 'internal server error'
            });

        } else {

            res.status(200).send({
                data: data
            });

        }





    })

});

apiRouter.post("/", function (req, res) {
    var newData = new data(req.body);
    newData.save(function (err, nd) {
        if (err) {
            res.status(500).send({
                meassage: 'error'
            });

        } else {
            res.status(200).send({
                data: nd
            });

        }

    })

});


apiRouter.post("/:id", function (req, res) { //to add comment
    var comment = req.body.comment;
    data.findOne({
        _id: req.params.id
    }, function (err, d) {
        if (err) {
            res.status(500).send({
                message: 'error'
            });

        } else {
            d.comments.push(comment);
            d.save(function (err, data) {
                if (err) {
                    res.status(500).send({
                        message: 'error'
                    });


                } else {
                    res.status(200).send({
                        'data': data
                    });
                }

            });


        }


    })


});

apiRouter.put("/:id", function (req, res) {
    // post edit
    data.findOne({
        _id: req.params.id
    }, function (err, data) {
        if (err) {
            res.status(500).send({
                message: 'internal error' + err
            });

        } else if (data == undefined) {

            res.status(404).send({
                message: 'not found'
            });
        } else {
            for (key in req.body) {
                data[key] = req.body[key]

            }



            data.save();
            res.status(200).send({
                updatedData: data
            })


        }

    });


});



//apiRouter.use(adminPriv);

apiRouter.delete("/:id", function (req, res) {
    // console.log(req.params.id);
    data.findOne({
        _id: req.params.id
    }, function (err, data) {
        if (err) {
            res.status(500).send({
                message: 'internal error' + err
            });

        } else if (data == undefined) {

            res.status(404).send({
                message: 'not found'
            });
        } else {
            data.remove(function (err, data) {
                if (err) {
                    res.status(500).send({
                        message: 'internal error' + err
                    });

                } else {

                    res.status(200).send({
                        message: 'removed!'
                    });
                }


            });

        }

    });


}); //dont need to save after remove

module.exports = apiRouter;
