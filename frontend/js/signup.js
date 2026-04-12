/* ================ SIGNUP JS ==================*/

const form = document.querySelector("#signupForm");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const toggleIcons = document.querySelectorAll(".togglePassword");
const strenghtText = document.querySelector("#passwordStrength");
const inputs = document.querySelectorAll("input");
const toast = document.querySelector("#toast");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    if (password.value !== confirmPassword.value) {
        alert("Password does not match");
        return;
    }

    if (password.value.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }

    console.log("Name: ", firstName.value + " " + lastName.value);
    console.log("Email: ", email.value);
    console.log("Password: ", password.value);

    const userData = {
        username: (firstName.value + " " + lastName.value).trim(),
        email: email.value,
        password: password.value
    };

    try {

        const response = await fetch("http://localhost:8080/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }
        showToast(data.message, "success");

        setTimeout(()=>{
            window.location.href = "login.html";
        },2000);

        form.reset();
        inputs.forEach(input => {
            input.classList.remove("valid", "invalid");
        });

        toggleIcons.forEach((icon) => {
            const input = icon.previousElementSibling;

            input.type = "password";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");

        });
        strenghtText.textContent = "";
        firstName.focus()

    } catch (error) {

        console.log("Error", error);
        showToast(error.message, "error");
    }

});

toggleIcons.forEach((icon) => {
    icon.addEventListener("click", () => {

        toggleStateCheck(icon);
    });

});

const toggleStateCheck = (icon) => {
        const input = icon.previousElementSibling;

        if(input.type === "password"){
            input.type = "text";
            icon.classList.replace("fa-eye", "fa-eye-slash");
        }else{
            input.type = "password";
            icon.classList.replace("fa-eye-slash", "fa-eye");
        }
}



const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

email.addEventListener("input", () => {

    if (email.value === "") {
        email.classList.remove("valid", "invalid");
        return;
    }

    if (emailPattern.test(email.value)) {
        email.classList.add("valid");
        email.classList.remove("invalid")
    } else {
        email.classList.add("invalid");
        email.classList.remove("valid");
    }

});

email.addEventListener("blur", () => {
    if (email.value === "") {
        email.classList.remove("valid", "invalid");
    }
});

password.addEventListener("input", () => {
    const value = password.value;
    let strenght = value.length;

    if (value === "") {
        password.classList.remove("valid", "invalid");
        return;
    }

    if (strenght <= 2) {
        strenghtText.textContent = "Weak password";
        strenghtText.className = "weak";
        password.classList.add("invalid");
        password.classList.remove("valid");
    } else if (strenght <= 5) {
        strenghtText.textContent = "Medium password";
        strenghtText.className = "medium";
        password.classList.remove("valid", "invalid");
    } else {
        strenghtText.textContent = "Strong password";
        strenghtText.className = "strong";
        password.classList.remove("invalid", "valid");
    }

    passwordValidate();

});

confirmPassword.addEventListener("input", () => {
    passwordValidate();
});

const passwordValidate = () => {

    if (confirmPassword.value === "") {
        confirmPassword.classList.remove("valid", "invalid");
        return;
    }

    if (password.value === confirmPassword.value) {
        confirmPassword.classList.add("valid");
        confirmPassword.classList.remove("invalid");
    } else {
        confirmPassword.classList.add("invalid");
        confirmPassword.classList.remove("valid");
    }
}

const showToast = (message, type = "success") => {
    toast.textContent = message;
    toast.className = "show";

    if(type === "error"){
        toast.classList.add("error");
    }

    setTimeout(()=>{
        toast.classList.remove("show", "error");
    }, 3000);
};

