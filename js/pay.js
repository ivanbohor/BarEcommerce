// Generando dinamicamente la tarjeta de pago
const tarjet = document.getElementById("contenedorPay");
function tarjetaPay() {
  let div = document.createElement("div");
  div.classList.add("contenedor");
  div.innerHTML = `<section class="tarjeta" id="tarjeta">
                        <div class="delantera">
                        <div class="logo-marca" id="logo-marca">
                            <!-- <img src="img/logos/visa.png" alt=""> -->
                        </div>
                        <img src="../img/tarjeta/chip-tarjeta.png" class="chip" alt="">
                        <div class="datos">
                            <div class="grupo" id="numero">
                            <p class="label">Número Tarjeta</p>
                            <p class="numero">#### #### #### ####</p>
                            </div>
                            <div class="flexbox">
                            <div class="grupo" id="nombre">
                                <p class="label">Nombre Tarjeta</p>
                                <p class="nombre">Juan Perez</p>
                            </div>

                            <div class="grupo" id="expiracion">
                                <p class="label">Expiracion</p>
                                <p class="expiracion"><span class="mes">MM</span> / <span class="year">AA</span></p>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="trasera">
                        <div class="barra-magnetica"></div>
                        <div class="datos">
                            <div class="grupo" id="ccv">
                            <p class="label">CCV</p>
                            <p class="ccv"></p>
                            </div>
                        </div>
                        <p class="leyenda">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus exercitationem,
                            voluptates illo.</p>
                        <a href="#" class="link-banco">www.tubanco.com</a>
                        </div>
                    </section>
                    <!-- Contenedor Boton Abrir Formulario -->
                    <div class="contenedor-btn">
                        <button class="btn-abrir-formulario" id="btn-abrir-formulario">
                        <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <!-- Formulario -->
                    <form action="" id="formulario-tarjeta" class="formulario-tarjeta">
                        <div class="grupo">
                        <label for="inputNumero">Número Tarjeta</label>
                        <input type="text" id="inputNumero" maxlength="19" autocomplete="off" required >
                        </div>
                        <div class="grupo">
                        <label for="inputNombre">Nombre</label>
                        <input type="text" id="inputNombre" maxlength="19" autocomplete="off" >
                        </div>
                        <div class="flexbox">
                        <div class="grupo expira">
                            <label for="selectMes">Expiracion</label>
                            <div class="flexbox">
                            <div class="grupo-select">
                                <select name="mes" id="selectMes">
                                <option disabled selected>Mes</option>
                                </select>
                                <i class="fas fa-angle-down"></i>
                            </div>
                            <div class="grupo-select">
                                <select name="year" id="selectYear">
                                <option disabled selected>Año</option>
                                </select>
                                <i class="fas fa-angle-down"></i>
                            </div>
                            </div>
                        </div>
                        <div class="grupo ccv">
                            <label for="inputCCV">CCV</label>
                            <input type="text" id="inputCCV" maxlength="3">
                        </div>
                        </div>
                        <button type="submit" class="btn-enviar" id="payFin" >Pagar</button>
                    </form> `;
  tarjet.appendChild(div);
}
tarjetaPay();
// mostrar tarjeta al poner "Ir a Pagar"
$("#btnPay").click(function () {
  $("#contenedorPay").toggle();
});
// Elementos de la tarjeta
const tarjeta = document.querySelector("#tarjeta"),
  btnAbrirFormulario = document.querySelector("#btn-abrir-formulario"),
  formulario = document.querySelector("#formulario-tarjeta"),
  numeroTarjeta = document.querySelector("#tarjeta .numero"),
  nombreTarjeta = document.querySelector("#tarjeta .nombre"),
  logoMarca = document.querySelector("#logo-marca"),
  firma = document.querySelector("#tarjeta .firma p"),
  mesExpiracion = document.querySelector("#tarjeta .mes"),
  yearExpiracion = document.querySelector("#tarjeta .year");
ccv = document.querySelector("#tarjeta .ccv");
// * Volteamos la tarjeta para mostrar el frente.
const mostrarFrente = () => {
  if (tarjeta.classList.contains("active")) {
    tarjeta.classList.remove("active");
  }
};
// * Rotacion de la tarjeta
tarjeta.addEventListener("click", () => {
  tarjeta.classList.toggle("active");
});
// * Boton de abrir formulario
btnAbrirFormulario.addEventListener("click", () => {
  btnAbrirFormulario.classList.toggle("active");
  formulario.classList.toggle("active");
});
// * Select del mes generado dinamicamente.
for (let i = 1; i <= 12; i++) {
  let opcion = document.createElement("option");
  opcion.value = i;
  opcion.innerText = i;
  formulario.selectMes.appendChild(opcion);
}
// * Select del año generado dinamicamente.
const yearActual = new Date().getFullYear();
for (let i = yearActual; i <= yearActual + 8; i++) {
  let opcion = document.createElement("option");
  opcion.value = i;
  opcion.innerText = i;
  formulario.selectYear.appendChild(opcion);
}
// * Input numero de tarjeta
formulario.inputNumero.addEventListener("keyup", (e) => {
  let valorInput = e.target.value;

  formulario.inputNumero.value = valorInput
    // Eliminamos espacios en blanco
    .replace(/\s/g, "")
    // Eliminar las letras
    .replace(/\D/g, "")
    // Ponemos espacio cada cuatro numeros
    .replace(/([0-9]{4})/g, "$1 ")
    // Elimina el ultimo espaciado
    .trim();

  numeroTarjeta.textContent = valorInput;

  if (valorInput == "") {
    numeroTarjeta.textContent = "#### #### #### ####";

    logoMarca.innerHTML = "";
  }

  if (valorInput[0] == 4) {
    logoMarca.innerHTML = "";
    const imagen = document.createElement("img");
    imagen.src = "../img/tarjeta/visa.png";
    logoMarca.appendChild(imagen);
  } else if (valorInput[0] == 5) {
    logoMarca.innerHTML = "";
    const imagen = document.createElement("img");
    imagen.src = "../img/tarjeta/mastercard.png";
    logoMarca.appendChild(imagen);
  }

  // Volteamos la tarjeta para que el usuario vea el frente.
  mostrarFrente();
});

// * Input nombre de tarjeta
formulario.inputNombre.addEventListener("keyup", (e) => {
  let valorInput = e.target.value;

  formulario.inputNombre.value = valorInput.replace(/[0-9]/g, "");
  nombreTarjeta.textContent = valorInput;
  firma.textContent = valorInput;

  if (valorInput == "") {
    nombreTarjeta.textContent = "Juan Perez";
  }

  mostrarFrente();
});

// * Select mes
formulario.selectMes.addEventListener("change", (e) => {
  mesExpiracion.textContent = e.target.value;
  mostrarFrente();
});

// * Select Año
formulario.selectYear.addEventListener("change", (e) => {
  yearExpiracion.textContent = e.target.value.slice(2);
  mostrarFrente();
});

// * CCV
formulario.inputCCV.addEventListener("keyup", () => {
  if (!tarjeta.classList.contains("active")) {
    tarjeta.classList.toggle("active");
  }

  formulario.inputCCV.value = formulario.inputCCV.value
    // Eliminar los espacios
    .replace(/\s/g, "")
    // Eliminar las letras
    .replace(/\D/g, "");

  ccv.textContent = formulario.inputCCV.value;
});

//  MODAL FINAL
$("#payFin").click(function () {
  // Generando num de operacion de compra random
  function generar() {
    let num = parseInt(Math.random() * 1000000);
    return num;
  }
  // modal pago exitoso
  swal({
    title: "Pago Exitoso!",
    text: "Tu comida numero " + generar() + " esta en camino",
    imageUrl: "thumbs-up.jpg",
  });
  $("#contenedorPay").toggle();
});
