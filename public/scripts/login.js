let selector = document.getElementById("signIn")
selector.addEventListener("click", (event)=> {
    event.preventDefault()
    let email = document.getElementById("userEmail").value
    let password = document.getElementById("userPassword").value

    fetch("/api/auth/signin", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({email, password})
    }).then(res=> res.json())
    .then(res=> {
        alert(res.message)
        if (res.status===200) {
            window.location.replace('/index.html')
        }
    })
    .catch(err=>alert(err.message))
})