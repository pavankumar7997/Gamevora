function login(){

    let username = document.getElementById("username").value;

    let email = document.getElementById("email").value;

    let password = document.getElementById("password").value;


    let users = JSON.parse(localStorage.getItem("users")) || [];


    let user = users.find(

        u => 
        u.username === username &&
        u.email === email &&
        u.password === password

    );


    if(user){

        alert("Login Successful ✅");


        localStorage.setItem(
            "loggedUser",
            JSON.stringify(user)
        );


        window.location.href="index.html";


    }

    else{

        alert("Invalid Details ❌");

    }


}