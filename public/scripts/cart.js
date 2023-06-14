// const params = new URLSearchParams(location.search)
// const id = params.get("id")


fetch("/api/carts")
.then(res=>res.json())
// .then(res => console.log(res))
.then(res => {
    let templates = res.carts.map(each => {
        let template = `
                <div class="card" style="width: 15rem;"> 
                    <div class="card-body">
                        <h5 class="card-title">${each.product.title}</h5>
                        <p class="card-text">${each.product.description}</p>
                        <p class="card-text">Cantidad: ${each.quantity}</p>
                        <p class="card-text">$${each.product.price}</p>
                        <input type="button" class="btn btn-primary" value="Eliminar producto"> 
                        <input type="button" class="btn btn-primary" value="Comprar"> 
                    </div>
                </div> `
        return template
        }).join("")
        document.getElementById("cart").innerHTML = templates
    })
.catch(err => console.log(err))