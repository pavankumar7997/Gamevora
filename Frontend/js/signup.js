function signup(){

    let username = document.getElementById("newUsername").value;
    let email = document.getElementById("newEmail").value;
    let password = document.getElementById("newPassword").value;


    if(username==="" || email==="" || password===""){

        document.getElementById("message").textContent =
        "Fill all details ❌";

        return;

    }


    // Get existing users

    let users = JSON.parse(localStorage.getItem("users")) || [];


    // Check duplicate email

    let existingUser = users.find(user => user.email === email);


    if(existingUser){

        document.getElementById("message").textContent =
        "Email already registered ❌";

        return;

    }


    // Create new user

    let newUser = {

        username: username,
        email: email,
        password: password

    };


    // Add user

    users.push(newUser);


    // Save all users

    localStorage.setItem("users", JSON.stringify(users));


    document.getElementById("message").textContent =
    "Account Created Successfully ✅";


    setTimeout(()=>{

        window.location="login.html";

    },1000);


}