export { renderSignUp }

const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5neGV6YWFrdnp4aHBjdWxoeGNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MzIxNDIsImV4cCI6MjA3NjEwODE0Mn0.sA7ge-JXvksn8KjYilvOYZwAAcyv3lLmWqT-3a2hvXI";

function renderSignUp(){
    const form = document.createElement("div");
    form.innerHTML = `
        <form>
        <div class="mb-3">
            <h1>Sign UP!</h1>
            <label for="InputEmail" class="form-label">Email address</label>
            <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="InputPassword" class="form-label">Password</label>
            <input type="password" class="form-control" id="InputPassword">
        </div>
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="Check">
            <label class="form-check-label" for="Check">Check me out</label>
        </div>
        <button type="submit" id="login-btn" class="btn btn-primary">Submit</button>
        </form>
    `
    const loginBtn = form.querySelector("#login-btn");

    loginBtn.addEventListener("click", () => {
        const email = form.querySelector("#InputEmail").value;
        const password = form.querySelector("#InputPassword").value;

        postUser(email, password);

        
    });

    return form;
}

async function postUser(email, password){
    const body = {
        "email": email,
        "password": password
    }
     let response = await fetch(`https://ngxezaakvzxhpculhxco.supabase.co/auth/v1/signup`,{
        method: `POST`,
        headers: {
            "apiKey": KEY,
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(body)
    });

    console.log(response.status);

    return response;
}
