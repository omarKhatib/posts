var mongoose = require('mongoose');
var schema = mongoose.Schema;
var postsSchema = new schema({
    post: String,
    likes:Number,
    disLikes:Number
    
    
    
});
module.exports=mongoose.model("Posts",postsSchema);