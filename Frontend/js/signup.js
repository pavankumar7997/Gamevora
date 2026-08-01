const API = "https://gamevora-backend.onrender.com/api/auth";
const username = document.getElementById("username").value;
fetch(`${API}/register`, {
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
// Signup
async function signup() {

    

    const username = document.getElementById("newUsername").value.trim();
    const email = document.getElementById("newEmail").value.trim();
    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!username || !email || !password || !confirmPassword) {
        document.getElementById("message").textContent = "Fill all details ❌";
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById("message").textContent = "Passwords do not match ❌";
        return;
    }

   

    const data = await response.json();

    if (data.success) {
        document.getElementById("message").textContent =
            "Account Created Successfully ✅";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);
    } else {
        document.getElementById("message").textContent = data.message;
    }
}

document.getElementById("signupBtn").addEventListener("click", signup);