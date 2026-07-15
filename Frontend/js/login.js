async function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
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

        if (response.ok && data.success) {

            alert("Login Successful ✅");

            // Save token and user
            localStorage.setItem("token", data.token);
            localStorage.setItem("loggedUser", JSON.stringify(data.user));

            // Redirect to Home Page
            window.location.href = "index.html";

        } else {

            alert(data.message || "Invalid Email or Password");

        }

    } catch (error) {

        console.error("Login Error:", error);
        alert("Server Error");

    }
}