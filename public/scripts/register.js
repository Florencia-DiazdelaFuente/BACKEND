let selector = document.getElementById("newUser")
selector.addEventListener("click", (event)=> {
    event.preventDefault()
    let name = document.getElementById("userName").value
    let photo = document.getElementById("userPhoto").value
    let email = document.getElementById("userEmail").value
    let age = document.getElementById("userAge").value
    let role = document.getElementById("userRole").value
    let password = document.getElementById("userPassword").value

    fetch("/api/auth/register", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({name, photo, email, age, role, password})
    }).then(res=> res.json())
    .then(res=> {
        alert(res.message)
        if (res.status===201) {
            window.location.replace('/index.html')
        }
    })
    .catch(err=>alert(err.message))
})