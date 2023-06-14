fetch("/api/products")
    .then(res => res.json())
    // .then(res=>console.log(res.products))
    .then(res => {
        let templates = res.products.map(each => {
        let template = `
                <div class="card" style="width: 15rem;"> 
                <img src=${each.img} class="card-img-top" alt=${each._id}>
                    <div class="card-body">
                        <h5 class="card-title">${each.title}</h5>
                        <p class="card-text">${each.description}</p>
                        <p class="card-text">$${each.price}</p>
                        <a href="/productDetail.html?id=${each._id}" class="btn btn-primary">Ver detalle</a>
                    </div>
                </div> `
        return template
        }).join("")
        document.getElementById("productsTemplate").innerHTML = templates
    })
    .catch(err => console.log(err))