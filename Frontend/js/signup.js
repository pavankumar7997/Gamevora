async function signup() {

    const username = document.getElementById("newUsername").value;
    const email = document.getElementById("newEmail").value;
    const password = document.getElementById("newPassword").value;

    if (username === "" || email === "" || password === "") {
        document.getElementById("message").textContent = "Fill all details ❌";
        return;
    }

    try {

        const response = await fetch("https://gamevora-backend.onrender.com/api/auth/register", {
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