// 1. Import Firebase
import { auth } from "./firebase.js";

import {
    RecaptchaVerifier,
    signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// 2. Create invisible reCAPTCHA  ← STEP 8.2
window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {
        size: "invisible"
    }
);

// 3. Get button
const sendOtpBtn = document.getElementById("sendOtpBtn");

// 4. Send OTP
sendOtpBtn.addEventListener("click", async () => {

    const phone = document.getElementById("phone").value.trim();

    if (!phone.startsWith("+")) {
        alert("Enter phone number like +919876543210");
        return;
    }

    try {
        const confirmationResult = await signInWithPhoneNumber(
            auth,
            phone,
            window.recaptchaVerifier
        );

        window.confirmationResult = confirmationResult;

        alert("OTP sent successfully!");

    } catch (err) {
        console.error(err);
        alert(err.message);
    }

});
const verifyOtpBtn = document.getElementById("verifyOtpBtn");

let otpVerified = false;

verifyOtpBtn.addEventListener("click", async () => {

    const otp = document.getElementById("otp").value;

    try {

        await window.confirmationResult.confirm(otp);

        otpVerified = true;

        alert("Phone number verified successfully ✅");

    } catch (err) {

        otpVerified = false;

        alert("Invalid OTP ❌");

    }

});
async function signup() {

    if (!otpVerified) {
        alert("Please verify your phone number first.");
        return;
    }

    const username = document.getElementById("newUsername").value.trim();
    const email = document.getElementById("newEmail").value.trim();
    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;   

    if (
        username === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {
        document.getElementById("message").textContent = "Fill all details ❌";
        
        return;
    }
    if (password !== confirmPassword) {

        document.getElementById("message").textContent =
            "Passwords do not match ❌";

        return;
    }

    try {
        const phone = document.getElementById("phone").value.trim();
        const response = await fetch("https://gamevora-backend.onrender.com/api/auth/register", {
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

    } catch (error) {

        console.error(error);
        document.getElementById("message").textContent =
            "Server Error ❌";

    }
}
const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", signup);