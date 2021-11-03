let carrito = [];
const containerCarrito = document.getElementById("carritoContenedor");
let total = 0;
//se llama a lo guardado en el localS en app.js para pintarlo en carritoLista.html
function recuperar() {
  let recuperar = JSON.parse(localStorage.getItem("carrito"));
  if (recuperar) {
    recuperar.forEach((el) => {
      carrito.push(el);
      let div = document.createElement("div");
      div.classList.add("row");
      div.classList.add("productoEnCarrito");
      div.innerHTML = `<div class="col"><h4> </h4>
                                    <img src=${el.img} class="card-img">
                                </div>
                                <div class="col"><h4>Producto</h4> 
                                    <span class="">${el.nombre} </span>
                                </div>
                                <div class="col"><h4>Precio</h4>
                                <span>$ ${el.precio} </span>
                                </div>
                                <div class="col botonera">
                                    <button id="eliminar${el.id}" class= "boton-eliminar">
                                    <i class="fas fa-backspace"></i>                              
                                    </button>
                                </div>`;
      containerCarrito.appendChild(div);
      // boton eliminar,se reemplaza array para que devuelva solo lo que tengo en el carrito
      let botonEliminar = document.getElementById(`eliminar${el.id}`);
      botonEliminar.addEventListener("click", () => {
        // remueve padre de padre de boton, osea productoEnCarrito
        botonEliminar.parentElement.parentElement.remove();
        carrito = carrito.filter((elE) => elE.id != el.id);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
      });
    });
  }
}
recuperar();
actualizarCarrito();

//formulario de envio con boton
$("#confirBtn").click(function () {
  $("#conContact").toggle();
});

// sumando precio de items
function actualizarCarrito() {
  precioTotal.innerText = carrito.reduce((acc, el) => acc + el.precio, 0);
}
