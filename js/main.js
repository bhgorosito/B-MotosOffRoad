const productos = [
    {
        id: "300-01",
        titulo: "VOGE 300 DS",
        imagen: "./img/300cc/01.jpg",
        categoria: {
            nombre: "Línea Adventure 300cc",
            id: "trescc"
        },
        precio: 1450000
    },
    {
        id: "300-02",
        titulo: "VOGE 300 RALLY",
        imagen: "./img/300cc/02.jpg",
        categoria: {
            nombre: "Línea Adventure 300cc",
            id: "trescc"
        },
        precio: 1650000
    },
     {
        id: "500-01",
        titulo: "VOGE 500 DS",
        imagen: "./img/500cc/01.jpg",
        categoria: {
            nombre: "Línea Adventure 500cc",
            id: "cincocc"
        },
        precio: 2450000
    },
    {
        id: "500-02",
        titulo: "VOGE 500 DSX",
        imagen: "./img/500cc/02.jpg",
        categoria: {
            nombre: "Línea Adventure 500cc",
            id: "cincocc"
        },
        precio: 2800000
    },
    {
        id: "650-01",
        titulo: "VOGE 650 DS",
        imagen: "./img/650cc/01.jpg",
        categoria: {
            nombre: "Línea Adventure 650cc",
            id: "seiscc"
        },
        precio: 3200000
    },
    {
        id: "650-02",
        titulo: "VOGE 650 DSX",
        imagen: "./img/650cc/02.jpg",
        categoria: {
            nombre: "Línea Adventure 650cc",
            id: "seiscc"
        },
        precio: 3450000
    },
];


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}