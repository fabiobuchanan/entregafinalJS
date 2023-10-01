const productos = [
    { id: 1, nombre: "Suscripción Mensual", img: "yoga1.jpg", categoria: "suscripción", precio: 20 },
    { id: 2, nombre: "Suscripción Semestral", img: "yoga2.jpg", categoria: "suscripción", precio: 18 },
    { id: 3, nombre: "Suscripción Anual", img: "", categoria: "suscripción", precio: 16 },
    { id: 4, nombre: "Paquete 3 Clases", img: "", categoria: "clase", precio: 10 },
    { id: 5, nombre: "Paquete 5 Clases", img: "", categoria: "clase", precio: 16 },
    { id: 6, nombre: "Paquete 7 Clases", img: "", categoria: "clase", precio: 24 },
    { id: 7, nombre: "Paquete 9 Clases", img: "", categoria: "clase", precio: 30 },
    { id: 8, nombre: 'Remera', img: "", categoria: "indumentaria", precio: 5000 },
    { id: 9, nombre: 'Calza', img: "", categoria: "indumentaria", precio: 10000 },
    { id: 10, nombre: 'Gorra', img: "", categoria: "indumentaria", precio: 4500 },
    { id: 11, nombre: 'Sweater', img: "", categoria: "indumentaria", precio: 12000 },
    { id: 12, nombre: 'Campera', img: "", categoria: "indumentaria", precio: 20000 }
];

const carritoDeCompras = [];

function mostrarProductos() {
    let listaDeProductos = "Productos Disponibles:\n";
    
    productos.forEach(producto => {
        listaDeProductos += `${producto.id}. ${producto.nombre} - $${producto.precio}\n`;
    });
    
    listaDeProductos += "0. Salir";
    
    return listaDeProductos;
}

function obtenerOpcionDelUsuario() {
    while (true) {
        const opcion = prompt(mostrarProductos() + "\nIngresa el número del producto o '0' para salir, 'C' para ver el carrito, o 'R' para eliminar productos:");

        if (opcion === null) {
            return null; // El usuario hizo clic en "Cancelar" o cerró el cuadro de diálogo
        }

        if (opcion === "0") {
            return 0; // Salir del menú
        }

        if (opcion === "C" || opcion === "c") {
            mostrarCarrito();
            continue;
        }

        if (opcion === "R" || opcion === "r") {
            eliminarProducto();
            continue;
        }

        const idProductoSeleccionado = parseInt(opcion);

        if (!isNaN(idProductoSeleccionado)) {
            const productoSeleccionado = productos.find(producto => producto.id === idProductoSeleccionado);
            if (productoSeleccionado) {
                return productoSeleccionado;
            }
        }

        alert("Entrada inválida. Ingresa un número de producto válido, '0' para salir, 'C' para ver el carrito, o 'R' para eliminar productos.");
    }
}

function agregarAlCarrito(producto) {
    carritoDeCompras.push(producto);
    alert(`${producto.nombre} - $${producto.precio} ha sido agregado a tu carrito.`);
}

function mostrarCarrito() {
    if (carritoDeCompras.length > 0) {
        let contenidoDelCarrito = "Carrito de Compras:\n";
        let precioTotal = 0;

        carritoDeCompras.forEach((producto, indice) => {
            contenidoDelCarrito += `${indice + 1}. ${producto.nombre} - $${producto.precio}\n`;
            precioTotal += producto.precio;
        });

        contenidoDelCarrito += `Precio Total: $${precioTotal}`;
        alert(contenidoDelCarrito);
    } else {
        alert("Tu carrito de compras está vacío.");
    }
}

function eliminarProducto() {
    if (carritoDeCompras.length === 0) {
        alert("Tu carrito de compras está vacío.");
        return;
    }

    let contenidoDelCarrito = "Carrito de Compras:\n";
    carritoDeCompras.forEach((producto, indice) => {
        contenidoDelCarrito += `${indice + 1}. ${producto.nombre} - $${producto.precio}\n`;
    });
    
    contenidoDelCarrito += "0. Cancelar\n";

    const opcion = prompt(contenidoDelCarrito + "Ingresa el número del producto que deseas eliminar o '0' para cancelar:");

    if (opcion === null) {
        return; // El usuario hizo clic en "Cancelar" o cerró el cuadro de diálogo
    }

    if (opcion === "0") {
        return; // Cancelar la operación de eliminación
    }

    const indiceProductoSeleccionado = parseInt(opcion) - 1;

    if (!isNaN(indiceProductoSeleccionado) && indiceProductoSeleccionado >= 0 && indiceProductoSeleccionado < carritoDeCompras.length) {
        const productoEliminado = carritoDeCompras.splice(indiceProductoSeleccionado, 1)[0];
        alert(`${productoEliminado.nombre} - $${productoEliminado.precio} ha sido eliminado de tu carrito.`);
    } else {
        alert("Entrada inválida. Ingresa un número de producto válido o '0' para cancelar.");
    }
}

while (true) {
    const productoSeleccionado = obtenerOpcionDelUsuario();

    if (productoSeleccionado === null) {
        break;
    }

    if (productoSeleccionado === 0) {
        break;
    }

    if (productoSeleccionado === "C" || productoSeleccionado === "c") {
        continue;
    }

    if (productoSeleccionado === "R" || productoSeleccionado === "r") {
        continue;
    }

    agregarAlCarrito(productoSeleccionado);
}

mostrarCarrito();
