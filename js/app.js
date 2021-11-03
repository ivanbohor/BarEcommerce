const mercadoProducts = document.getElementById("marketProduct");
const precioTotal = document.getElementById("precioTotal");

let stockProductos = [];
// se obtiene datos de lo guardado en el localStorage
function recuperarStock() {
  let stock = JSON.parse(localStorage.getItem("stock"));
  if (stock) {
    stock.forEach((el) => stockProductos.push(el));
  }
}
// se cambia array de productos por JSON
$.getJSON("stock.json", function (data) {
  localStorage.setItem("stock", JSON.stringify(data));
  recuperarStock();
  viewProduct(data);
});
//imprime en el HTML los productos del stock.json//
viewProduct(stockProductos);
function viewProduct(array) {
  for (const productos of array) {
    let div = document.createElement("div");
    div.classList.add("productBody");
    div.innerHTML += `<div class="card shadow mb-3 bg-dark rounded m-3 animate__animated animate__backInDown " style="width: 20rem">
                            <h5 class="card-title pt-2 text-center ">
                            ${productos.nombre}
                            </h5>
                            <img class="card-img-top card-image"
                            src=${productos.img}
                            alt="plato-comida">
                            <div class="card-content">
                                <p class="card-text text-white-50 description">
                                    ${productos.descripcion}
                                </p>
                                <h5 class="text">
                                    Precio: <span class="precio">$ ${productos.precio}</span>
                                </h5>
                                <div class="d-grid gap-2">
                                    <button id="boton${productos.id}" class="btn btn-primary button">Añadir a Carrito</button>
                                </div>
                            </div>
                         </div>`;
    mercadoProducts.appendChild(div);
    //captura de los botones de cada producto//
    let boton = document.getElementById(`boton${productos.id}`);
    boton.addEventListener("click", () => {
      carritoLista(productos.id);
      // modal de agregado
      swal("Añadido!", "Tu plato ya esta en el Carrito!", "success");
    });
  }
}
// con la captura del boton tomo el id para filtrar solo los datos de cada productos
function carritoLista(id) {
  let productAgregar = stockProductos.find((prod) => prod.id == id);
  carrito.push(productAgregar);
  // se guarda en Local para luego llamarlo en carrito.js en function "recuperar"
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
// search lupita buscador
function searchPosts(input, selector) {
  document.addEventListener("keyup", (e) => {
    if (e.target.matches(input)) {
      document
        .querySelectorAll(selector)
        .forEach((element) =>
          element.textContent.toLowerCase().includes(e.target.value)
            ? element.classList.remove("filter")
            : element.classList.add("filter")
        );
    }
  });
}
document.addEventListener("DOMContentLoaded", (e) => {
  searchPosts(".search", ".productBody ");
});
