const bbdd = "https://ecommercebackend.fundamentos-29.repl.co/"

let datos

const articles = document.querySelector("#articles")

function getItems(){
    axios.get(bbdd)
        .then((response)=>{
            const items = response.data
            printItems(items)
        })
        .catch((error)=>{
            console.log(error)
        })
}
 getItems()

function printItems(items){
    let hmtl = ""
    for (const item of items) {
        hmtl += `
        <div class="section1__article">
            <div class="section1__article-body">
                <div>
                    <h5 class="section1__article-title">${item.name}</h5>
                </div>
                <div>
                    <img src="${item.image}" alt="" class="section1__article__img">
                </div>
                <div>
                    <p>precio:${item.price}</p>
                </div>
                <div>
                    <button data-id="${item.id}" type="button" class="section1__article-button ${item.id}">Add</button>
                </div>
            </div>
      </div>
      `;
    }
    articles.innerHTML = hmtl
}

let cartList= document.querySelector(".section2__cart-list")
    document.querySelector("#articles").addEventListener("click", (event)=>{
        if(event.target.classList.contains("section1__article-button")) {
            let hola = event.target.attributes.class.textContent.split(" ")[1]
            console.log(hola);
            function itemCart(){
                axios.get(bbdd)
                .then((response)=>{
                    const items = response.data
                    let cart = ""
                    for (let item of items) {
                        if(item.id === Number(hola)){
                            cart+= `
                            <li>Nombre: ${item.name}</li>
                            <li>precio: ${item.price}</li>`
                        }
                    }
                    cartList.innerHTML +=cart
                })
                .catch((error)=>{
                    console.log(error)
                })   
            }
            itemCart()
        }
})


