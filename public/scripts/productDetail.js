const params = new URLSearchParams(location.search)
const id = params.get("id")


fetch("/api/products/" + id)
.then(res=>res.json())
// .then(res => console.log(res))
.then(res => {
    let template = `
            <div class="card" style="width: 15rem;"> 
            <img src=${res.product.img} class="card-img-top" alt=${res.product._id}>
                <div class="card-body">
                    <h5 class="card-title">${res.product.title}</h5>
                    <p class="card-text">${res.product.description}</p>
                    <p class="card-text">$${res.product.price}</p>
                    <p class="card-text">Seleccionar cantidad</p>
                    <input type="number">
                    <input type="button" class="btn btn-primary" value="agregar al carrito"> 
                </div>
            </div> `
// al boton de agregar al carrito hay que asignarle un evento que haga un fetch al endpoint put para agregar un producto al carrito
    document.getElementById("productDetail").innerHTML = template
})
.catch(err => console.log(err))