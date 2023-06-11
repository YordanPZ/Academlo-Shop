//! Variables
const bbdd = "https://ecommercebackend.fundamentos-29.repl.co/"
let cartList= document.querySelector(".section2__cart-list")
const articles = document.querySelector("#articles")
const navCart = document.querySelector(".nav__cart")
let cartVisible = document.querySelector(".main__section2")

//! Hacer la peticion a la API
function getItems() {
  axios
    .get(bbdd)
    .then((response) => {
      const items = response.data;
      printItems(items);
    })
    .catch((error) => {
      console.log(error);
    });
}
getItems();
//! Imprimir los elementos en la grilla
function printItems(items) {
  let hmtl = "";
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
  articles.innerHTML = hmtl;
}
//! Agregar elementos al Carrito
document.querySelector("#articles").addEventListener("click", (event) => {
  if (event.target.classList.contains("section1__article-button")) {
    let id = event.target.attributes.class.textContent.split(" ")[1];
    function itemCart() {
      axios
        .get(bbdd)
        .then((response) => {
          const items = response.data;
          let cart = "";
          let total = 0
          for (let item of items) {
            if (item.id === Number(id)) {
              cart += `
                    <li>${item.name}</li>
                    <img src="${item.image}" alt="#" class="section2__cart-img">
                    <li>$ ${item.price}</li>
                    <hr>
                    `;
                    total+=item.price
            }
          }

          cartList.innerHTML += cart;
          cartList.innerHTML
        })
        .catch((error) => {
          console.log(error);
        });
    }
    itemCart();
  }
});
//! Aparecer y esconder el Carrito
navCart.addEventListener("click", ()=>{
    cartVisible.classList.toggle("main__section2--toggle2")
    document.querySelector(".main__section1").classList.toggle("blurmain")


})
