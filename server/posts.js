var mongoose = require('mongoose');
var schema = mongoose.Schema;
var postsSchema = new schema({
    post: {
        type:String,
        required:true
    },
    likes:Number,
    disLikes:Number,
    comments:[String]
    
    
    
});
module.exports=mongoose.model("Posts",postsSchema);