const userId = document.querySelector("#userId");
const usernameGreet = document.querySelector("#usernameGreet");
const usernameCard = document.querySelector("#usernameCard");
const email = document.querySelector("#email");
const logoutBtn = document.querySelector(".logout-btn");
const logoutPopup = document.querySelector(".logout-popup");
const noLogoutBtn = document.querySelector("#no-btn");
const yesLogoutBtn = document.querySelector("#yes-btn");
const overlay = document.querySelector(".overlay");

const fun = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/auth/home",
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        if (!response.ok) {
            localStorage.removeItem("token");
            window.location.href = "login.html";
            return;
        }

        const data = await response.json();

        userId.textContent = data.id;
        usernameCard.textContent = data.username;
        usernameGreet.textContent = data.username;
        email.textContent = data.email;

    } catch (e) {
        console.error(e);

    }

};

document.addEventListener("DOMContentLoaded", () => {
    fun();
});

logoutBtn.addEventListener("click", () => {
    logoutPopup.classList.add("show");
    overlay.classList.add("show");
});

yesLogoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
});

noLogoutBtn.addEventListener("click", () => {
    logoutPopup.classList.remove("show");
    overlay.classList.remove("show");
});

