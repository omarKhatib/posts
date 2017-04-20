var mongoose = require('mongoose');
var schema = mongoose.Schema;
var postsSchema = new schema({
    post: {
        type:String,
        required:true
    },
    image: String,
    likes:Number,
    disLikes:Number,
    tags:[String],
    comments:[String]
    
    
    
});
module.exports=mongoose.model("Posts",postsSchema);