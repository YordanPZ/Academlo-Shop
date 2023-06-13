//! Variables
const bbdd = "https://ecommercebackend.fundamentos-29.repl.co/";
let cartList = document.querySelector(".section2__cart-list");
const articles = document.querySelector("#articles");
const navCart = document.querySelector(".nav__cart"); //boton
let cartVisible = document.querySelector(".nav__section2"); //section
let detail = document.querySelector(".modal");

let detailvisible= document.querySelector(".section3__article-button") //boton
let detailBtn = document.querySelector(".main_section3") //section

//? Productos del carrito
let carProducts = []

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
        <div data-id="${item.id}" class="section1__article">
            <div class="section1__article-body">
                  <h5 class="section1__article-title ${item.id}">${item.name}</h5>
                <div>
                    <img src="${item.image}" alt="" class="section1__article__img">
                </div>
                    <p class="section1__article__price">$ ${item.price}</p>
                <div class="section1__article-btncontainer">
                    <button data-id="${item.id}" type="button" class="section1__article-button ${item.id}">Add</button>
                </div>
            </div>
      </div>
      `;
  }
  articles.innerHTML = hmtl;
}
//! Agregar elementos al Carrito y Modal
document.querySelector("#articles").addEventListener("click", (event) => {
  if (event.target.classList.contains("section1__article-button")) {
    const carProductsElement = event.target.parentElement.parentElement.parentElement
    carProductsElements(carProductsElement)

    // let id = event.target.attributes.class.textContent.split(" ")[1];
    // function itemCart() {
    //   axios
    //     .get(bbdd)
    //     .then((response) => {
    //       const items = response.data;
    //       let cart = "";
    //       // let total = 0;
    //       for (let item of items) {
    //         if (item.id === Number(id)) {
    //           cart += `
    //           <div class= "section2__cart-item"> 
    //                 <li class="section2__cart-name">${item.name}</li>
    //                 <img src="${item.image}" alt="#" class="section2__cart-img">
    //                 <li class="section2__cart-price">$ ${item.price}</li>
    //           </div>
    //                 `;
    //           // total += item.price;
    //         }
    //       }
    //       cartList.innerHTML += cart;
    //       // cartList.innerHTML;
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
    // itemCart();
  } else {
    if (event.target.classList.contains("section1__article-title")) {
      let id = event.target.attributes.class.textContent.split(" ")[1];
      function itemCart() {
        axios
          .get(bbdd)
          .then((response) => {
            const items = response.data;
            let cart = "";
            for (let item of items) {
              if (item.id === Number(id)) {
                cart +=`
                        <div class="section3__article">
                          <div class="section3__article-body"> 
                              <h5 class="section3__article-title">${item.name}</h5>
                              <p class="section3__article-category">Categoria: ${item.category} </p>
                              <img src="${item.image}" alt="#" class="section3__article-img">
                              <p class="section3__article-price">$ ${item.price}</p>
                              <p class="section3__article-quantity">Disponibles: ${item.quantity}</p>
                            <div class="section3__article-contdescription">
                              <p class="section3__article-description">${item.description}</p>
                            </div>
                          </div>
                        </div>`;
              }
            }
            detail.innerHTML = cart;
            document.querySelector(".main_section3").classList.toggle("section3__article--visible");
            document.querySelector(".main__section1").classList.toggle("blurmain");
          })
          .catch((error) => {
            console.log(error);
          });
      }
      itemCart();
    }
  }
});
//! Aparecer y esconder el Carrito
navCart.addEventListener("click", () => {
  cartVisible.classList.toggle("nav__section2--toggle2");
  document.querySelector(".main__section1").classList.toggle("blurmain");
});
//! Aparecer y esconder detalle
 detailvisible.addEventListener("click", () => {
   detailBtn.classList.toggle("section3__article--visible");
   document.querySelector(".main__section1").classList.toggle("blurmain");
 });

 //? convertir HTML el array de objetos
 function carProductsElements(product){
  const infoProduct = {
    id:product.querySelector("button").getAttribute("data-id") ,
     name: product.querySelector(".section1__article-body h5").textContent,
     image:product.querySelector("img").src ,
    price:product.querySelector(".section1__article-body p").textContent,
    quantity:1 ,
  }

  console.log(infoProduct);

 }


