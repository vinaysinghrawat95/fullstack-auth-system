const form = document.querySelector("#login-form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const toast = document.querySelector("#toast");
const toggleIcon = document.querySelector(".togglePassword");
const loginButton = document.querySelector(".login-btn");


form.addEventListener("submit", async (event) => {



    event.preventDefault();

    console.log("Email : ", email.value);
    console.log("Password : ", password.value);

    const userData = {
        email: email.value,
        password: password.value
    };

    try {

        loginButton.disabled = true;
        loginButton.textContent = "Loging in...";

        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const text = await response.text();

        const data = text ? JSON.parse(text) : {};
        console.log("From Server: ", data);
        console.log("Data type: ", data.type)

        if (!response.ok) {
            throw new Error(data.message || "Login Failed");
        }
        // showToast(message, "success");

        localStorage.setItem("token", data.jwtToken);

        setTimeout(() => {
            window.location.href = "home.html"

        }, 2000);

        form.reset();
        email.focus();

    } catch (error) {
        showToast();
        console.log(error);

    } finally {
        loginButton.disabled = false;
        loginButton.textContent = "Login";
    }


});

toggleIcon.addEventListener("click", () => {
    const input = toggleIcon.previousElementSibling;

    if (input.type === "password") {
        input.type = "text";
        toggleIcon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        input.type = "password";
        toggleIcon.classList.replace("fa-eye-slash", "fa-eye");
    }
});


const showToast = (() => {
    toast.textContent = "Invalid credential, Try Again!";
    toast.className = "show"
    toast.classList.add("error");


    setTimeout(() => {
        toast.classList.remove("show", "error");
    }, 3000);

});