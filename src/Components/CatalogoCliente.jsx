import { useState, useEffect } from "react"
import Swal from "sweetalert2"

function CatalogoCliente() {
  // Productos de prueba por si el admin no ha guardado nada aún
  const productosPrueba = [
    { id: 1, nombre: "Cerveza Poker", precio: 3500, stock: 100 },
    { id: 2, nombre: "Cerveza Águila", precio: 2800, stock: 80 },
    { id: 3, nombre: "Club Colombia", precio: 4000, stock: 50 },
  ]

  const [productos, setProductos] = useState([])
  const email = localStorage.getItem("emailCYO") || "cliente@cyo.com"

  useEffect(() => {
    // Intentamos leer lo que guardó el admin
    const guardados = localStorage.getItem("cervezasDistribuidora")
    
    if (guardados) {
      setProductos(JSON.parse(guardados))
    } else {
      // Si no hay nada, mostramos los de prueba
      setProductos(productosPrueba)
    }
  }, [])

  const hacerPedido = async (producto) => {
    const { value: cantidad } = await Swal.fire({
      title: `Pedir ${producto.nombre}`,
      input: "number",
      inputLabel: `Stock disponible: ${producto.stock}`,
      inputAttributes: { min: 1, max: producto.stock },
      showCancelButton: true,
      confirmButtonText: "Confirmar Pedido",
      confirmButtonColor: "#d4af37",
      background: "#1a1a1a",
      color: "#ffffff",
    })

    if (cantidad) {
      const pedidosGuardados = JSON.parse(localStorage.getItem("pedidosDistribuidora") || "[]")
      const nuevoPedido = {
        id: Math.max(0, ...pedidosGuardados.map(p => p.id)) + 1,
        cliente: email,
        producto: producto.nombre,
        cantidad: Number(cantidad),
        fecha: new Date().toISOString().slice(0, 10),
        estado: "Pendiente"
      }
      
      localStorage.setItem("pedidosDistribuidora", JSON.stringify([...pedidosGuardados, nuevoPedido]))
      
      Swal.fire({
        icon: "success",
        title: "¡Pedido registrado!",
        text: "Revisa 'Mis pedidos' para ver el estado.",
        confirmButtonColor: "#d4af37",
        background: "#1a1a1a",
        color: "#ffffff"
      })
    }
  }

  return (
    <div>
      <h2 className="text-warning mb-3">Catálogo de Productos</h2>
      
      <div className="row g-3">
        {productos.map((prod) => (
          <div className="col-md-4" key={prod.id}>
            <div className="card bg-dark text-white border-warning h-100 p-3">
              <h5 className="text-warning">{prod.nombre}</h5>
              <p className="mb-1">Precio: ${prod.precio.toLocaleString()}</p>
              <p className="mb-3 small text-muted">Stock: {prod.stock}</p>
              <button 
                className="btn btn-warning mt-auto fw-bold" 
                onClick={() => hacerPedido(prod)}
              >
                Hacer Pedido
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CatalogoCliente