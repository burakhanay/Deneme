var ct;
var data;

$(document).ready(function(){
    $("#password1").keyup(function(){
        let pswd = $(this).val();
        if ( pswd.length < 8 ) {
            $('#length').removeClass('valid').addClass('invalid');
        } else {
            $('#length').removeClass('invalid').addClass('valid');
        }

        if ( pswd.match(/[.!@#$%^&*]/) ) {
            $('#special').removeClass('invalid').addClass('valid');
        } else {
            $('#special').removeClass('valid').addClass('invalid');
        }
        
        //validate capital letter
        if ( pswd.match(/[A-Z]/) ) {
            $('#capital').removeClass('invalid').addClass('valid');
        } else {
            $('#capital').removeClass('valid').addClass('invalid');
        }
        
        //validate number
        if ( pswd.match(/\d/) ) {
            $('#number').removeClass('invalid').addClass('valid');
        } else {
            $('#number').removeClass('valid').addClass('invalid');
        }

       $("#pswd_info").show();
    }).blur(function(){
        $("#pswd_info").hide();
    });

    $("#password2").keyup(function(){
        let pass1 = document.getElementById("password1").value;
        let pass2 = document.getElementById("password2").value;
        let bool = pass_validator(pass1,pass2);
        if(bool){
            $("#pswd_error").hide();
            $("#pswd_success").show();
        }else{
            $("#pswd_error").show();
            $("#pswd_success").hide();
        }
    }).blur(function(){
        $("#pswd_error").hide();
        $("#pswd_success").hide();
    });
});

function getReq() {
    $.get("http://10.2.21.155:1998/", function (data, textStatus, jqXHR) {
        document.getElementById("serRes").innerHTML = data; 
        //console.log(document.getElementById("captcha_result").value);

    });
}

function postReq(user,password) {
    console.log("post req çalıştı");
    /*data = {"Username": user,
            "Password" : password,
            "URL" : URL,
            "Time" : ct,
            "Comment" : comment
            };*/
    data = {"Username" : user,"Password": password};
    $.post("http://10.2.21.155:1998/api/v1/login", data, 
    function (res,status,xhr){
        //console.log(status);
        //console.log(xhr);
        console.log(res.Response);
    },"json"
    )
}

function current_time(user,password,URL,comment){
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    ct = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

    //document.getElementById("time").value = ct;
    //console.log(document.getElementById("time").value)
    postReq(user,password,URL,comment);
    //return ct;
}

function login(){
    let user = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    postReq(user,password);
    //let URL = document.getElementById("url").value;
    //let comment = document.getElementById("comment").value;
    //document.getElementById("resim").src = URL;

    //current_time(user,password,URL,comment);
    //postReq(user,password,URL,comment);
    

}

function sign_in(){
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let username = document.getElementById("username").value;
    let email = document.getElementById("e-mail").value;
    let pass1 = document.getElementById("password1").value;
    let pass2 = document.getElementById("password2").value;
    let bool = pass_validator(pass1,pass2);
    if(bool){
        console.log(bool);
    }else{
        console.log(bool);
    }
    

}

function yazdir(){
    console.log(document.getElementById("username").value);
    console.log(document.getElementById("password").value);
    document.getElementById("password").value = "";
    document.getElementById("username").value = "";   
}


function pass_validator(pass1,pass2){


    if(pass1 === pass2){
        return true;
    }else{
        return false;
    }
}