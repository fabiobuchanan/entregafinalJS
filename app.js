class Producto {
  constructor(id, nombre, img, categoria, precio, descripcion, cantidad = 1) {
    this.id = id;
    this.nombre = nombre;
    this.img = img;
    this.categoria = categoria;
    this.precio = precio;
    this.descripcion = descripcion;
    this.cantidad = cantidad;
  }

  aumentarCantidad(){
    this.cantidad++
  }

  disminuirCantidad(){
    if(this.cantidad > 1){
        this.cantidad--
    }
  }

  descripcionCarrito(){
    return `<div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${this.img}" class="img-fluid rounded-start" alt="${this.alt}">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${this.nombre}</h5>
          <p class="card-text">${this.descripcion}</p>
          <p class="card-text">Cantidad: ${this.cantidad}</p>
          <p class="card-text">Precio x unidad: $${this.precio}</p>
          <button class="btn btn-danger" id="ep-${this.id}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
    </div>`
  }

  descripcionProducto(){
    return `<div class="card mb-3 border-primary" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${this.img}" class="img-fluid rounded-start" alt="${this.alt}">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${this.nombre}</h5>
          <p class="card-text">${this.descripcion}</p>
          <p class="card-text">Cantidad: ${this.cantidad}</p>
          <p class="card-text">Precio x unidad: $${this.precio}</p>
          <button class="btn btn-primary" id="ap-${this.id}">Añadir al Carrito</button>
        </div>
      </div>
    </div>
    </div>`
  }
}

class ProductoController {
  constructor() {
    this.listaProductos = [];
  }

  agregar(producto) {
    this.listaProductos.push(producto);
  }

  cargarProductos(){
    const p1 = new Producto(1, "Suscripción Mensual", "img/yoga1.jpg", "suscripción", 20, "Accedé a todas las clases durante un período de un mes.");
    const p2 = new Producto(2, "Suscripción Semestral", "img/yoga2.jpg", "suscripción", 18, "Accedé a todas las clases durante un período de 6 meses.");
    const p3 = new Producto(0, "Suscripción Anual", "img/yoga3.jpg", "suscripción", 16, "Accedé a todas las clases durante un período de un año.");
    const p4 = new Producto(4, "Paquete 3 Clases", "img/yoga4.jpg", "clase", 10, "Accedé a las mejores clases de Yoga.");
    const p5 = new Producto(5, "Paquete 5 Clases", "img/yoga5.jpg", "clase", 16, "Accedé a las mejores clases de Yoga.");
    const p6 = new Producto(6, "Paquete 7 Clases", "img/yoga6.jpg", "clase", 24, "Accedé a las mejores clases de Yoga.");
    const p7 = new Producto(7, "Paquete 9 Clases", "img/yoga7.jpg", "clase", 30, "Accedé a las mejores clases de Yoga.");
    const p8 = new Producto(8, "Remera", "img/yoga8.jpg", "suscripción", 5000, "Los mejores productos de Yoga para una práctica cómoda y con buena tela.");
    const p9 = new Producto(9, "Calza", "img/yoga1.jpg", "suscripción", 10000, "Los mejores productos de Yoga para una práctica cómoda y con buena tela.");
    const p10 = new Producto(10, "Gorra", "img/yoga1.jpg", "suscripción", 4500, "Los mejores productos de Yoga para una práctica cómoda y con buena tela.");
    const p11 = new Producto(11, "Sweater", "img/yoga1.jpg", "suscripción", 12000, "Los mejores productos de Yoga para una práctica cómoda y con buena tela.");
    const p12 = new Producto(12, "Campera", "img/yoga1.jpg", "suscripción", 20000, "Los mejores productos de Yoga para una práctica cómoda y con buena tela.");
      
      CP.agregar(p1)
      CP.agregar(p2)
      CP.agregar(p3)
      CP.agregar(p4)
      CP.agregar(p5)
      CP.agregar(p6)
      CP.agregar(p7)
      CP.agregar(p8)
      CP.agregar(p9)
      CP.agregar(p10)
      CP.agregar(p11)
      CP.agregar(p12)
  }

  mostrarEnDOM() {
    let contenedor_productos = document.getElementById("contenedor_productos")
    this.listaProductos.forEach(producto => {
      contenedor_productos.innerHTML += producto.descripcionProducto()
    })

    this.listaProductos.forEach(producto => {
        const btn_ap = document.getElementById(`ap-${producto.id}`)

        btn_ap.addEventListener("click",()=>{
            carrito.agregar(producto)
            carrito.guardarEnStorage()
            carrito.mostrarEnDOM()
        })
    })
  }
}

class Carrito{
    constructor(){
        this.listaCarrito = []
    }

    agregar(productoAgregar){

        let existe = this.listaCarrito.some(producto => producto.id == productoAgregar.id)

        if(existe){
           let producto = this.listaCarrito.find(producto => producto.id == productoAgregar.id)
           producto.aumentarCantidad()
        }else{
            if(productoAgregar instanceof Producto){
                this.listaCarrito.push(productoAgregar)
            }
        }
    }

    eliminar(productoAEliminar){
        let indice = this.listaCarrito.findIndex(producto => producto.id == productoAEliminar.id)
        this.listaCarrito.splice(indice, 1)
    }

    guardarEnStorage(){
        let listaCarritoJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito", listaCarritoJSON)
    }

    recuperarStorage(){
        let listaCarritoJSON = localStorage.getItem("listaCarrito")
        let listaCarritoJS = JSON.parse(listaCarritoJSON)
        let listaAux = []
        if(listaCarritoJS) {
        listaCarritoJS.forEach(producto => {
            //id, nombre, img, categoria, precio, descripcion
            let nuevoProducto = new Producto(producto.id, producto.nombre, producto.img, producto.categoria, producto.precio, producto.descripcion, producto.cantidad)
            listaAux.push(nuevoProducto)
            this.listaCarrito = listaAux;
        })
      }
    }

    mostrarEnDOM() {
        let contenedor_carrito = document.getElementById("contenedor_carrito")
        contenedor_carrito.innerHTML = ""
        this.listaCarrito.forEach(producto => {
          contenedor_carrito.innerHTML += producto.descripcionCarrito();
        })

        this.eventoEliminar()
        this.mostrarTotal()
      }

    eventoEliminar(){
      this.listaCarrito.forEach(producto => {
          // obtener el id de los botones
          const btn_eliminar = document.getElementById(`ep-${producto.id}`)
      
          // darle el evento
          btn_eliminar.addEventListener("click", ()=>{
               // eliminar del carrito
              this.eliminar(producto)
                 // actualizar storage
              this.guardarEnStorage()
                //mostrar en DOM
              this.mostrarEnDOM()
          })
        })
    }

    calcularTotal(){
        return this.listaCarrito.reduce((acumulador, producto)=> acumulador + producto.precio * producto.cantidad,0)
    }

    mostrarTotal(){
        const precio_total = document.getElementById("precio_total")
        precio_total.innerText = `Precio total: ${this.calcularTotal()}`
    }
}

const CP = new ProductoController();
const carrito = new Carrito()
carrito.recuperarStorage()
carrito.mostrarEnDOM()
CP.cargarProductos()
CP.mostrarEnDOM()
