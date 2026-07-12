// ======================
// Game Search System
// ======================

document.getElementById("searchBtn").onclick = function(){

    let searchText = document
    .getElementById("searchBox")
    .value
    .toLowerCase()
    .trim();


    let cards = document.querySelectorAll(".card");


    cards.forEach(function(card){

        let title = card.querySelector("h3")
        .innerText
        .toLowerCase();


        if(title.includes(searchText)){

            card.style.display = "";

        }
        else{

            card.style.display = "none";

        }

    });

};



document.getElementById("clearBtn").onclick = function(){

    document.getElementById("searchBox").value = "";


    let cards = document.querySelectorAll(".card");


    cards.forEach(function(card){

        card.style.display = "";

    });

};



// ======================
// Dark / Light Mode
// ======================

const themeBtn = document.getElementById("themeToggle");


if(themeBtn){

themeBtn.onclick=function(){

    document.body.classList.toggle("light-mode");


    if(document.body.classList.contains("light-mode")){

        themeBtn.innerHTML="🌙";

    }
    else{

        themeBtn.innerHTML="☀️";

    }

}

}



// ======================
// Save Visit Count
// ======================

let visits = localStorage.getItem("visits");


if(visits){

    visits++;

}
else{

    visits=1;

}


localStorage.setItem("visits",visits);


console.log("GameHub Visits:",visits);
// ==========================
// User Profile & Logout
// ==========================

const welcomeUser = document.getElementById("welcomeUser");
const avatar = document.getElementById("avatar");
const logoutBtn = document.getElementById("logoutBtn");

const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

if (loggedUser) {

    // If your signup saves "username"
    const name = loggedUser.username || loggedUser.name;

    if (welcomeUser) {
        welcomeUser.textContent = `Welcome, ${name} 👋`;
    }

    if (avatar) {
        avatar.textContent = name.charAt(0).toUpperCase();
    }
}

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

    localStorage.removeItem("loggedUser");

    alert("Logged out successfully!");

    window.location.href = "index.html";

});

}
// ==========================
// Loader
// ==========================

window.onload = function(){

    setTimeout(function(){

        document.getElementById("loader").style.display="none";

    },1500);

};
const sections = document.querySelectorAll(
".stats, .games, .reviews, .leaderboard, .trending"
);

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

});

sections.forEach(section => {

    section.classList.add("hidden");

    observer.observe(section);

});