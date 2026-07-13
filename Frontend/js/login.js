async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log("Email =", email);
    console.log("Password =", password);

    try {
        const API = "https://gamevora-backend.onrender.com";
        const response = await fetch("https://gamevora-backend.onrender.com/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();
        console.log("Login Response:", data);
        if (data.success) {

            alert("Login Successful ✅");

            console.log("Saving token...");

            localStorage.setItem("token", data.token);
            localStorage.setItem("loggedUser", JSON.stringify(data.user));

            console.log("Token:", localStorage.getItem("token"));
            console.log("User:", localStorage.getItem("loggedUser"));

            // Temporarily disable redirect
            // window.location.href = "index.html";

        }else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);
        alert("Server Error");
    }
}