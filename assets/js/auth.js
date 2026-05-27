/* PASSWORD TOGGLE */

const toggleButtons =
document.querySelectorAll(
    ".toggle-password"
);

toggleButtons.forEach(button => {

    button.addEventListener("click", () => {

        const input =
        button.previousElementSibling;

        if(input.type === "password"){

            input.type = "text";
        }

        else{

            input.type = "password";
        }
    });
});

/* SIGNUP FORM */

const signupForm =
document.querySelector("#signup-form");

if(signupForm){

    signupForm.addEventListener("submit",
    (e) => {

        e.preventDefault();

        validateSignup();
    });
}

/* LOGIN FORM */

const loginForm =
document.querySelector("#login-form");

if(loginForm){

    loginForm.addEventListener("submit",
    (e) => {

        e.preventDefault();

        validateLogin();
    });
}

/* EMAIL VALIDATION */

function isValidEmail(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(email);
}

/* PASSWORD VALIDATION */

function isStrongPassword(password){

    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    .test(password);
}

/* SIGNUP VALIDATION */

function validateSignup(){

    const name =
    document.querySelector("#signup-name");

    const email =
    document.querySelector("#signup-email");

    const password =
    document.querySelector("#signup-password");

    const confirm =
    document.querySelector("#confirm-password");

    /* NAME */

    if(name.value.trim() === ""){

        alert("Name required");

        return;
    }

    /* EMAIL */

    if(!isValidEmail(email.value)){

        alert("Invalid email");

        return;
    }

    /* PASSWORD */

    if(!isStrongPassword(password.value)){

        alert(
        "Password must contain uppercase, lowercase, number and 8 characters"
        );

        return;
    }

    /* CONFIRM PASSWORD */

    if(password.value !== confirm.value){

        alert("Passwords do not match");

        return;
    }

    alert("Signup Successful!");
}

/* LOGIN VALIDATION */

function validateLogin(){

    const email =
    document.querySelector("#login-email");

    const password =
    document.querySelector("#login-password");

    if(!isValidEmail(email.value)){

        alert("Invalid email");

        return;
    }

    if(password.value.trim() === ""){

        alert("Password required");

        return;
    }

    alert("Login Successful!");
}

/* PASSWORD STRENGTH */

const signupPassword =
document.querySelector("#signup-password");

if(signupPassword){

    signupPassword.addEventListener(
    "input", () => {

        const strength =
        document.querySelector(
            "#password-strength"
        );

        const value =
        signupPassword.value;

        if(value.length < 6){

            strength.textContent =
            "Weak Password";
        }

        else if(value.length < 8){

            strength.textContent =
            "Medium Password";
        }

        else{

            strength.textContent =
            "Strong Password";
        }
    });
}