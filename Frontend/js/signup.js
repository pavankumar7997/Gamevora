let otpVerified = false;

const API = "https://gamevora-backend.onrender.com/api/auth";

// Send OTP
document.getElementById("sendOtpBtn").addEventListener("click", async () => {

    const email = document.getElementById("newEmail").value.trim();

    if (!email) {
        alert("Enter your email first");
        return;
    }

    const response = await fetch(`${API}/send-otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    });

    const data = await response.json();

    alert(data.message);
});

// Verify OTP
document.getElementById("verifyOtpBtn").addEventListener("click", async () => {

    const email = document.getElementById("newEmail").value.trim();
    const otp = document.getElementById("otp").value.trim();

    const response = await fetch(`${API}/verify-otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, otp })
    });

    const data = await response.json();

    if (data.success) {
        otpVerified = true;
        alert("Email verified successfully ✅");
    } else {
        otpVerified = false;
        alert(data.message);
    }
});

// Signup
async function signup() {

    if (!otpVerified) {
        alert("Please verify your email first.");
        return;
    }

    const username = document.getElementById("newUsername").value.trim();
    const email = document.getElementById("newEmail").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!username || !email || !phone || !password || !confirmPassword) {
        document.getElementById("message").textContent = "Fill all details ❌";
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById("message").textContent = "Passwords do not match ❌";
        return;
    }

    const response = await fetch(`${API}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            email,
            phone,
            password
        })
    });

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