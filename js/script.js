// Selectores
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

const resultado = document.querySelector("#resultado");
const max = new Date().getFullYear();
const min = max - 13;

// generar un objeto con la busqueda
const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos); //muestra los autos al cargar

  // llena las opciones de años
  llenarSelect();
});
// event listener para los select de busqueda
marca.addEventListener("change", (e) => {
  
  datosBusqueda.marca = e.target.value;
  filtrarAuto();
});
year.addEventListener("change", (e) => {
  
  datosBusqueda.year = parseInt(e.target.value);
  filtrarAuto();
});
minimo.addEventListener("change", (e) => {
  
  datosBusqueda.minimo = e.target.value;
  filtrarAuto();
});
maximo.addEventListener("change", (e) => {
  
  datosBusqueda.maximo = e.target.value;
  filtrarAuto();
});
puertas.addEventListener("change", (e) => {
  
datosBusqueda.puertas = Number(e.target.value);

  filtrarAuto();
});
transmision.addEventListener("change", (e) => {
  
  datosBusqueda.transmision = e.target.value;
  filtrarAuto();
});
color.addEventListener("change", (e) => {
  
  datosBusqueda.color = e.target.value;
  filtrarAuto();
 
});
function mostrarAutos(autos) {
  limpiarHTML();
  autos.forEach((auto) => {
    // aplicaremos destruction
    const { marca, modelo, year, puertas, transmision, precio, color } = auto;
    const autosHTML = document.createElement("p");
    autosHTML.textContent = `
        ${marca} ${modelo} - ${year}
        - ${puertas} Puertas - Transmision : ${transmision} 
        - Precio: ${precio} - Color:  ${color} `;

    resultado.appendChild(autosHTML);
  });
}

function llenarSelect() {
  for (let i = max; i >= min; i--) {
    const opcion = document.createElement("option");
    opcion.value = i; // al la propiedad de la etiqueta
    opcion.textContent = i;
    year.appendChild(opcion); //agrega las opciones de año al select
  }
}
// limpiar Html
function limpiarHTML() {
  // mientras aya algo
  while (resultado.firstChild) {
    // elimine todos los option de resultado
    resultado.removeChild(resultado.firstChild);
  }
}

// Funcion que filtra en base a la busqueda
function filtrarAuto() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);


  if(resultado.length){
    mostrarAutos(resultado);
} else {
   noResultado();
}
}
// no lo encuentra 
function noResultado() {
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.appendChild(document.createTextNode('No hay Resultados'));
    document.querySelector('#resultado').appendChild(noResultado);
}


function filtrarMarca(auto) {
  const { marca } = datosBusqueda;
  if (marca) {
    return auto.marca === marca;
  }
  return auto; // si ninguna seleccion esta devuelve todo porque niuno tiene
}
function filtrarYear(auto) {
  const { year } = datosBusqueda;
  if (year) {
    return auto.year === year;
  }
  return auto;
}
function filtrarMinimo(auto) {
  const { minimo } = datosBusqueda;
  if (minimo) {
    return auto.precio >= minimo;
  }
  return auto;
}
function filtrarMaximo(auto) {
  const { maximo } = datosBusqueda;
  if (maximo) {
    return auto.precio <= maximo;
  }
  return auto;
}
function filtrarPuertas(auto) {
    if(datosBusqueda.puertas){
        return auto.puertas === datosBusqueda.puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    if(datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision;
    } 
    return auto;
}

function filtrarColor(auto){
    if(datosBusqueda.color){
        return auto.color === datosBusqueda.color;
    } 
    return  auto;
}