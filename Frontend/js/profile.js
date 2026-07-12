// Get logged-in user
const user = JSON.parse(localStorage.getItem("loggedUser"));

const profileAvatar = document.getElementById("profileAvatar");
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");

if (user) {

    profileAvatar.textContent = user.username.charAt(0).toUpperCase();

    profileName.textContent = user.username;

    profileEmail.textContent = user.email;

} else {

    window.location.href = "login.html";

}
const logoutBtn = document.getElementById("logoutProfile");

logoutBtn.onclick = function () {

    localStorage.removeItem("loggedUser");

    window.location.href = "index.html";

};