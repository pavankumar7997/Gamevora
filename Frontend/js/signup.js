const API = "https://gamevora-backend.onrender.com/api/auth";

// Signup
async function signup() {
    const username = document.getElementById("newUsername").value.trim();
    const email = document.getElementById("newEmail").value.trim();
    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("message");

    message.textContent = "";

    if (!username || !email || !password || !confirmPassword) {
        message.textContent = "Fill all details ❌";
        return;
    }

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match ❌";
        return;
    }

    try {
    const response = await fetch(`${API}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            email,
            password
        })
    });

    const data = await response.json();

    console.log("Status:", response.status);
    console.log("Response:", data);

    if (response.ok) {
        message.textContent = "Account created successfully!";
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);
    } else {
        message.textContent = data.message;
    }

} catch (error) {
    console.error(error);
    message.textContent = "Server Error";
}
}

document.getElementById("signupBtn").addEventListener("click", signup);