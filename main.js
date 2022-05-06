const express = require("express");
const app = express();
const cors = require("cors");
const axios = require('axios');
const crypto = require("crypto");




const mongoose = require("mongoose");
const Blog = require("./DB_Models/db_model");
const Signin = require("./DB_Models/db_signin");
const res = require("express/lib/response");

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended : false}));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

const dbURL = "mongodb://127.0.0.1:27017/SocialMedia";
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log("Bağlantı kuruldu"))
    .catch((err) => console.log(err));

function gen_sha512(username,password){
    let data = username + ":" + password;
    let hash = crypto.createHash("sha512").update(data).digest('hex');
    return hash;
}    

const arr = ["burak","elif","handan","mustafa","hatice"];




function DB_Write(Username,URL,Comment,Time){
    let data = new Blog({
        "Username" : Username,
        "Comment"  : Comment,
        "URL" : URL,
        "Time" : Time
    });
    data.save().then((res) => {console.log(res)})
                .catch((err) => {err});
}

function DB_Signin(Username,Password,EMail,Firstname,Lastname){
    
    let data = new Signin({
        "Username" : Username,
        "Password"  : Password,
        "EMail" : EMail,
        "Firstname" : Firstname,
        "Lastname" : Lastname
    });
    console.log(data);
    data.save().then((res) => {console.log(res)})
                .catch((err) => {err});
}

function DB_Search(Username){
    try {
        let data = Signin.find({"Username" : Username});
        return data;
                         
    } catch (error) {
        return error;
    }
}

function Hash_Check(pass1, pass2){
    console.log("----------");
    console.log(pass1);
    console.log(pass2);
    console.log("----------");
    if(pass1 == pass2){
        console.log("Eşleşti");
        return true;
    }
    else{
        console.log("Hata");
        return false;
    }
}
    

app.use(cors({
    origin: "*",
    methods: ["GET","POST"],
    credentials : true,
}));


app.post("/api/v1/",(req,res) =>{
    console.log("-------------------");
    DB_Write(req.body.Username,req.body.URL,req.body.Comment,req.body.Time);
   
});

app.post("/api/v1/signin",(req,res) =>{
    console.log("-------------------");
    let user = req.body.Username;
    let pass = req.body.Password;
    let email = req.body.Mail;
    let Firstname = req.body.Firstname;
    let Lastname = req.body.Lastname;

    let hash = gen_sha512(user,pass);
    DB_Signin(user,hash,email,Firstname,Lastname);

    
    res.send("Başarılı");
    
});

app.post("/api/v1/login", async (req,res) =>{
    
    try {
        console.log("-------------------");
        let user = req.body.Username;
        let pass = req.body.Password;
        let hash = gen_sha512(user,pass);
        let DB_res = await DB_Search(user);
        console.log(DB_res);

        console.log("DB_res_p : " + DB_res[0].Password);

        let DB_hash = DB_res[0].Password;
        let bool =  Hash_Check(hash,DB_hash);
        console.log(bool);

        res.send("DB_hash");
    } catch (error) {
        res.send(error);
    }
    
});

app.get("/admin", (req,res) => {
    res.send("Welcome Admin Panel");
});


app.listen(1998);


