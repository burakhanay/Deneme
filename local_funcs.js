var ct;
var data;

function getReq() {
    $.get("http://10.2.21.155:1998/", function (data, textStatus, jqXHR) {
        document.getElementById("serRes").innerHTML = data; 
        //console.log(document.getElementById("captcha_result").value);

    });
}

function postReq(user,password,URL,comment) {
    console.log("post req çalıştı");
    data = {"Username": user,
            "Password" : password,
            "URL" : URL,
            "Time" : ct,
            "Comment" : comment
            };
    console.log(data);
    $.post("http://10.2.21.155:1998/api/v1/", data, 
    function (data,status,xhr){
        console.log(status);
        console.log(xhr);
        console.log(data);
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

function upload(){
    let user = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let URL = document.getElementById("url").value;
    let comment = document.getElementById("comment").value;
    document.getElementById("resim").src = URL;

    current_time(user,password,URL,comment);
    //postReq(user,password,URL,comment);
    

}

function yazdir(){
    console.log(document.getElementById("username").value);
    console.log(document.getElementById("password").value);
    document.getElementById("password").value = "";
    document.getElementById("username").value = "";   
}

