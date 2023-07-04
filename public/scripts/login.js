let selector = document.getElementById("signIn")
selector.addEventListener("click", (event)=> {
    event.preventDefault()
    let data = {
        email : document.getElementById("userEmail").value,
        password : document.getElementById("userPassword").value
    }
    // let email = document.getElementById("userEmail").value
    // let password = document.getElementById("userPassword").value


    fetch("/api/auth/signin", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(data)
    })
    .then(res=> res.json())
    .then(res=> {
        alert(res.message)
        if (res.status===200) {
            window.location.replace('/index.html')
            // let template = `
            //         <p class=""> User${res.email} connected</p>
            //     `
            //     document.getElementById("userConnected").innerHTML = template
        }
    })
    .catch(err=>alert(err.message))
})

document.getElementById('signout').addEventListener('click',(event)=> {
    event.preventDefault()
    fetch('/api/auth/signout',{
        method: 'POST',
        headers: {"Content-Type" : "application/json"}
    })
        .then(res=>res.json())
        .then(res=>alert(res.message))
        .catch(err=>console.log(err))
})

document.getElementById('signinGithub').addEventListener('click',(event)=> {
    event.preventDefault()
    fetch('/api/auth/github')
        .then(res=>res.json())
        .then(res=>alert(res.message))
        .catch(err=>console.log(err))
})

