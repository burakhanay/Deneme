const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    Username : {
        type : String,
        require : true
    },
    URL :{
        type : String,
        require : true
    },
    Time :{
        type : String,
        require : true
    },
    Comment :{
        type : String,
        require : true
    },
    EMail :{
        type : String,
        require : true
    },
    Password :{
        type : String,
        require : true
    }

},
{
    collection: 'Image_URL'
});

const Blog = mongoose.model("Blog",BlogSchema);
module.exports = Blog;
