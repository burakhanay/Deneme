const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    Firstname : {
        type : String,
        require : true
    },Lastname : {
        type : String,
        require : true
    },
    Username : {
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
    collection: 'Users'
});

const Signin = mongoose.model("Signin",BlogSchema);
module.exports = Signin;