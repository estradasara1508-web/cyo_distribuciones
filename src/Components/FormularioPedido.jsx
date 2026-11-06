import { useState, useEffect } from "react"
import Swal from "sweetalert2"

function FormularioPedido({ producto, emailCliente, alCancelar, alConfirmar }) {
  // Estados del formulario
  const [cantidad, setCantidad] = useState(1)
  const [nombre, setNombre] = useState("")
  const [telefono, setTelefono] = useState("")
  const [direccion, setDireccion] = useState("")

  // Cargar datos previos del cliente (si ya los guardó antes)
  useEffect(() => {
    const perfiles = JSON.parse(localStorage.getItem("perfilesClientes") || "{}")
    if (perfiles[emailCliente]) {
      setNombre(perfiles[emailCliente].nombre || "")
      setTelefono(perfiles[emailCliente].telefono || "")
      setDireccion(perfiles[emailCliente].direccion || "")
    }
  }, [emailCliente])

  const enviarPedido = (e) => {
    e.preventDefault()

    if (cantidad < 1 || cantidad > producto.stock) {
      Swal.fire("Atención", "La cantidad no es válida o excede el stock.", "warning")
      return
    }

    // Guardar pedido
    const pedidosGuardados = JSON.parse(localStorage.getItem("pedidosDistribuidora") || "[]")
    const nuevoPedido = {
      id: Math.max(0, ...pedidosGuardados.map(p => p.id)) + 1,
      cliente: emailCliente,
      producto: producto.nombre,
      cantidad: Number(cantidad),
      fecha: new Date().toISOString().slice(0, 10),
      estado: "Pendiente",
      datosEnvio: { nombre, telefono, direccion }
    }
    localStorage.setItem("pedidosDistribuidora", JSON.stringify([...pedidosGuardados, nuevoPedido]))

    // Guardar/Actualizar datos del perfil del cliente
    const perfiles = JSON.parse(localStorage.getItem("perfilesClientes") || "{}")
    perfiles[emailCliente] = { nombre, telefono, direccion }
    localStorage.setItem("perfilesClientes", JSON.stringify(perfiles))

    Swal.fire({
      icon: "success",
      title: "¡Pedido registrado!",
      text: "El administrador revisará tu pedido pronto.",
      confirmButtonColor: "#d4af37",
      background: "#1a1a1a",
      color: "#ffffff"
    })

    alConfirmar() // Vuelve al catálogo
  }

  return (
    <div className="p-4 rounded" style={{ background: "#222", border: "1px solid var(--hp-gold)", maxWidth: "600px" }}>
      <h3 className="text-warning mb-4">Formulario de Pedido</h3>
      <p className="text-white">Estás pidiendo: <strong>{producto.nombre}</strong></p>
      
      <form onSubmit={enviarPedido}>
        <div className="mb-3">
          <label className="form-label text-white">Cantidad (Stock: {producto.stock})</label>
          <input type="number" className="form-control bg-dark text-white border-secondary" min="1" max={producto.stock} value={cantidad} onChange={e => setCantidad(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label text-white">Nombre Completo</label>
          <input type="text" className="form-control bg-dark text-white border-secondary" value={nombre} onChange={e => setNombre(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label text-white">Teléfono</label>
          <input type="text" className="form-control bg-dark text-white border-secondary" value={telefono} onChange={e => setTelefono(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label text-white">Dirección de Entrega</label>
          <input type="text" className="form-control bg-dark text-white border-secondary" value={direccion} onChange={e => setDireccion(e.target.value)} required />
        </div>
        
        <div className="d-flex gap-2 mt-4">
          <button type="button" className="btn btn-outline-light w-50" onClick={alCancelar}>Cancelar</button>
          <button type="submit" className="btn btn-warning fw-bold w-50">Confirmar Pedido</button>
        </div>
      </form>
    </div>
  )
}

export default FormularioPedido