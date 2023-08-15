const sideForm = document.querySelector("form.side.login");
const loginForm = document.querySelector("form.center.login");
const signupForm = document.querySelector("form.signup")

if (sideForm) {
    sideForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        console.log("Side Login Clicked");

        const email = sideForm.querySelector("input.email").value;
        const password = sideForm.querySelector("input.password").value;

        try {
            const response = await fetch("/login", {
                method: "POST",
                body: JSON.stringify({email, password}),
                headers : {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json();
            console.log(data.errors);
            if (data.errors){
                document.querySelector(".side-login").querySelector(".email.error").textContent = data.errors.email
                document.querySelector(".side-login").querySelector(".password.error").textContent = data.errors.password
            }
            if (data.id){
                location.assign("/");
            }
        } catch (error) {
            console.log(new Error("Fetch Error"));
        }

    })
}
if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        console.log("Login Clicked");

        const email = loginForm.querySelector("input.email").value;
        const password = loginForm.querySelector("input.password").value;

        try {
            const response = await fetch("/login", {
                method: "POST",
                body: JSON.stringify({email, password}),
                headers : {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json();
            console.log(data.errors);
            if (data.errors){
                document.querySelector(".center-box").querySelector(".email.error").textContent = data.errors.email
                document.querySelector(".center-box").querySelector(".password.error").textContent = data.errors.password
            }
            if (data.id){
                location.assign("/");
            }
        } catch (error) {
            console.log(new Error("Fetch Error"));
        }
    })
}
if (signupForm) {
    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        console.log("SignUp Clicked");

        const password = signupForm.querySelector("input.password").value;
        const confirmPassword = signupForm.querySelector("input.confirm-password").value;

        if (password === confirmPassword){
            const username = signupForm.querySelector("input.username").value;
            const email = signupForm.querySelector("input.email").value;
            const firstname = signupForm.querySelector("input#firstname").value;
            const lastname = signupForm.querySelector("input#lastname").value;

            try {
                const response = await fetch("/signup", {
                    method: "POST",
                    body: JSON.stringify({email,username,firstname,lastname, password}),
                    headers : {
                        "Content-Type": "application/json"
                    }
                })
                const data = await response.json();
                if (data.id){
                    location.assign("/");
                }
                if (data.errors){
                    document.querySelector(".center-box").querySelector(".username.error").textContent = data.errors.username
                    document.querySelector(".center-box").querySelector(".name.error").textContent = data.errors.firstname || data.errors.lastname
                    document.querySelector(".center-box").querySelector(".email.error").textContent = data.errors.email
                    document.querySelector(".center-box").querySelector(".password.error").textContent = data.errors.password
                } else {
                    document.querySelector(".center-box").querySelector(".username.error").textContent = ""
                    document.querySelector(".center-box").querySelector(".name.error").textContent = ""
                    document.querySelector(".center-box").querySelector(".email.error").textContent = ""
                    document.querySelector(".center-box").querySelector(".password.error").textContent = ""
                }
            } catch (error) {
                console.log(new Error("Fetch Error"));
            }

        }
        else {
            const passError = signupForm.querySelector(".password.error");
            passError.textContent = "Password doesn't match";
        }
    })
        
}
