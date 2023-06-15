//! Variables
//? URL API
const bbdd = "https://ecommercebackend.fundamentos-29.repl.co/";
//? Esconder carrito
const navCart = document.querySelector("#nav__cartBtn"); //boton
const cartVisible = document.querySelector(".nav__section2"); //section
//? Ordenar Higher
const btnLower = document.querySelector("#btnlower");
const btnHigher = document.querySelector("#btnhigher");
const btnss = document.querySelector(".nav__pricebtn");
//? Carrito de compras
const car = document.querySelector("#car");
let cartList = document.querySelector("#car__list");
//? Modal
const articles = document.querySelector("#articles");
const detail = document.querySelector(".modal");
//? Vaciar carrito
const emptyCarButton = document.querySelector("#empty-cart");
//? Total del carrito
let total = document.querySelector("#car__total");
//? Esconder detalle
const detailvisible = document.querySelector(".section3__article-button"); //boton
const detailBtn = document.querySelector(".main_section3"); //section
//? Productos del carrito
let carProducts = [];
//? Todos los Items
let allProducts = [];
//! Funcion escuchadora
//*LISTO
eventListnerLoaders();
function eventListnerLoaders() {
  //* Cuando se presione el boton de "Add to cart"
  articles.addEventListener("click", addProduct);
  car.addEventListener("click", deleteProducts);
  emptyCarButton.addEventListener("click", emptyCar);
  btnss.addEventListener("click", btn);
  articles.addEventListener("click", Modal);
}
//! Hacer la peticion a la API
//*LISTO
function getItems() {
  axios
    .get(bbdd)
    .then((response) => {
      const items = response.data;
      console.log(items);
      printItems(items);
    })
    .catch((error) => {
      console.log(error);
    });
}
getItems();
//! Imprimir los elementos en la grilla
//*LISTO
function printItems(items) {
  let hmtl = "";
  let nombres = [];
  for (const item of items) {
    nombres.push({
      id: item.id,
      nombre: item.name,
      precio: item.price,
      image: item.image,
      quantity: item.quantity,
      description: item.description,
      category: item.category,
    });
    hmtl += `
        <div data-id="${item.id}" class="section1__article">
            <div class="section1__article-body">
                  <h5 class="section1__article-title ${item.id}">${item.name}</h5>
                <div>
                    <img src="${item.image}" alt="" class="section1__article__img">
                </div>
                    <p class="section1__article__price"><i class="fa-solid fa-dollar-sign"></i> ${item.price}</p>
                <div class="section1__article-btncontainer">
                    <button data-id="${item.id}" type="button" class="section1__article-button ${item.id}">Add</button>
                </div>
            </div>
        </div>
      `;
  }
  allProducts = nombres;
  articles.innerHTML = hmtl;
}
//! Aparecer y esconder el Carrito
//*LISTO
navCart.addEventListener("click", () => {
  cartVisible.classList.toggle("nav__section2--toggle2");
  document.querySelector(".main__section1").classList.toggle("blurmain");
});
//! Aparecer y esconder Modal
//*LISTO
detailvisible.addEventListener("click", () => {
  detailBtn.classList.toggle("section3__article--visible");
  document.querySelector(".main__section1").classList.toggle("blurmain");
});
// //! Agregar elementos al carrito
//*LISTO
function addProduct(event) {
  if (event.target.classList.contains("section1__article-button")) {
    const produc = event.target.parentElement.parentElement.parentElement;
    carProductsElements(produc);
  }
}
//! Mostrar Modal
//*LISTO
function Modal(event) {
  if (event.target.classList.contains("section1__article-title")) {
    let id = event.target.attributes.class.textContent.split(" ")[1];
    const items = [...allProducts];
    let cart = "";
    for (let item of items) {
      if (item.id === Number(id)) {
        cart += `
               <div class="section3__article">
                <div class="section3__article-body"> 
                    <h5 class="section3__article-title">${item.nombre}</h5>
                    <p class="section3__article-category">Categoria: ${item.category} </p>
                    <img src="${item.image}" alt="#" class="section3__article-img">
                     <p class="section3__article-price">$ ${item.precio}</p>
                     <p class="section3__article-quantity">Disponibles: ${item.quantity}</p>
                   <div class="section3__article-contdescription">
                     <p class="section3__article-description">${item.description}</p>
                   </div>
                </div>
               </div>`;
      }
    }
    detail.innerHTML = cart;
    document
      .querySelector(".main_section3")
      .classList.toggle("section3__article--visible");
    document.querySelector(".main__section1").classList.toggle("blurmain");
  }
}
//! Sumar al carrito teniendo en cuenta que los duplicados
//*LISTO
//? convertir HTML el array de objetos
function carProductsElements(product) {
  const infoProduct = {
    id: product.querySelector("button").getAttribute("data-id"),
    name: product.querySelector(".section1__article-body h5").textContent,
    image: product.querySelector("img").src,
    price: product.querySelector(".section1__article-body p").textContent,
    quantity: 1,
  };
  if (carProducts.some((product) => product.id === infoProduct.id)) {
    const productIncrement = carProducts.map((product) => {
      if (product.id === infoProduct.id) {
        product.quantity++;
        return product;
      } else {
        return product;
      }
    });
    carProducts = [...productIncrement];
  } else {
    carProducts = [...carProducts, infoProduct];
  }
  let totalPrice = 0;
  for (let product of carProducts) {
    totalPrice += product.price * product.quantity;
  }
  total.innerHTML = `<p class="btnTotal">Total:$ ${totalPrice}</p>`;
  carElementsHTML();
}
//! Sumar Elementos al carrito
//*LISTO
function carElementsHTML() {
  let carHTML = "";
  for (let product of carProducts) {
    carHTML += `  <div class= "section2__cart-item"> 
                     <p class="section2__cart-name">${product.name}</p>
                     <img src="${product.image}" alt="#" class="section2__cart-img">
                     <p class="section2__cart-price"><i class="fa-solid fa-dollar-sign"></i> ${product.price}</p>
                     <p class="section2__cart-quant">Cantidad: ${product.quantity}</p>
                  </div>
                  <div class="car__product__button">
                    <button class="delete__product" data-id="${product.id}">
                          <p>Eliminar</p>
                    </button>
                  </div>`;
  }
  cartList.innerHTML = carHTML;
}
//! Eliminar productos del Carrito
//*LISTO
function deleteProducts(event) {
  if (event.target.classList.contains("delete__product")) {
    const productId = event.target.getAttribute("data-id");
    carProducts = carProducts.filter((produc) => produc.id !== productId);
    carElementsHTML();
  }
  if (carProducts.length === 0) {
    const empty = `<p>Carrito vacio!</p>`;
    cartList.innerHTML = empty;
  }
  let totalPrice = 0;
  for (let product of carProducts) {
    totalPrice += product.price * product.quantity;
  }
  total.innerHTML = `<p>Total:$ ${totalPrice}</p>`;
}
//! Vaciar carrito
//*LISTO
function emptyCar() {
  carProducts = [];
  carElementsHTML();
}
//! Ordenar los articulos Higher or Lower
//*LISTO
function btn(event) {
  if (event.target.classList.contains("lower")) {
    let lower = [...allProducts].sort((a, b) => {
      return a.precio - b.precio;
    });
    let hmtl = "";
    for (const item of lower) {
      hmtl += `
          <div data-id="${item.id}" class="section1__article">
              <div class="section1__article-body">
                    <h5 class="section1__article-title ${item.id}">${item.nombre}</h5>
                  <div>
                      <img src="${item.image}" alt="" class="section1__article__img">
                  </div>
                      <p class="section1__article__price"><i class="fa-solid fa-dollar-sign"></i> ${item.precio}</p>
                  <div class="section1__article-btncontainer">
                      <button data-id="${item.id}" type="button" class="section1__article-button ${item.id}">Add</button>
                  </div>
              </div>
        </div>
        `;
    }
    articles.innerHTML = hmtl;
  } else {
    if (event.target.classList.contains("higher")) {
      let lower = [...allProducts].sort((a, b) => {
        return b.precio - a.precio;
      });
      let hmtl = "";
      for (const item of lower) {
        hmtl += `
          <div data-id="${item.id}" class="section1__article">
              <div class="section1__article-body">
                    <h5 class="section1__article-title ${item.id}">${item.nombre}</h5>
                  <div>
                      <img src="${item.image}" alt="" class="section1__article__img">
                  </div>
                      <p class="section1__article__price"><i class="fa-solid fa-dollar-sign"></i> ${item.precio}</p>
                  <div class="section1__article-btncontainer">
                      <button data-id="${item.id}" type="button" class="section1__article-button ${item.id}">Add</button>
                  </div>
              </div>
        </div>
        `;
      }
      articles.innerHTML = hmtl;
    }
  }
}
