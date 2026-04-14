const userId = document.querySelector("#userId");
const usernameGreet = document.querySelector("#usernameGreet");
const usernameCard = document.querySelector("#usernameCard");
const email = document.querySelector("#email");

const fun = async () => {

    const token = localStorage.getItem("token");

    if(!token){
        
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/auth/home",
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer "+ token
                }
            }
        );

        const data = await response.json();

        if(!response.ok){
            localStorage.removeItem("token");
            window.location.href = "login.html";
            return;
        }

        userId.textContent = data.id;
        usernameCard.textContent = data.username;
        usernameGreet.textContent = data.username;
        email.textContent = data.email;

        console.log(data);  
    }catch(e){
        console.error(e);
        
    }

};

document.addEventListener("DOMContentLoaded", ()=> {
    console.log(localStorage.getItem("token"));
    
    fun();
});

