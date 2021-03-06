const mongoose = require('mongoose');
const PostSchema  = new mongoose.Schema({
    title :{
        type  : String,
        required : true
    },
    author :{
        type  : String,
        required : true
    },
    tags :{
        type : String,
        required : true
    },
    body :{
        type : String,
        required : true
    },
    timestamp :{
        type : Date,
        default : Date.now
    }
});
const Post= mongoose.model('Post',UserSchema);

module.exports = Post;