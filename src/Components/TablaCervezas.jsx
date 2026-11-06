import { useState, useEffect } from "react"
import Swal from "sweetalert2"

const productosIniciales = [
  { id: 1, nombre: "Cerveza Poker", precio: 3500, stock: 100, estado: "Disponible", categoria: "Cervezas" },
  { id: 2, nombre: "Cerveza Águila", precio: 2800, stock: 80, estado: "Disponible", categoria: "Cervezas" },
  { id: 3, nombre: "Club Colombia", precio: 4000, stock: 50, estado: "Disponible", categoria: "Cervezas" },
  { id: 4, nombre: "Cerveza Costeña", precio: 3000, stock: 60, estado: "Disponible", categoria: "Cervezas" },
  { id: 5, nombre: "Aguardiente Amarillo", precio: 56000, stock: 20, estado: "Disponible", categoria: "Licores" },
  { id: 6, nombre: "Aguardiente Antioqueño", precio: 52000, stock: 15, estado: "Disponible", categoria: "Licores" },
  { id: 7, nombre: "Aguardiente Néctar", precio: 48000, stock: 25, estado: "Disponible", categoria: "Licores" },
  { id: 8, nombre: "Four Loko", precio: 15000, stock: 40, estado: "Disponible", categoria: "Licores" },
  { id: 9, nombre: "Cigarrillos Rothmans", precio: 8000, stock: 200, estado: "Disponible", categoria: "Cigarrillos" },
  { id: 10, nombre: "Cigarrillos Lucky Strike", precio: 9500, stock: 150, estado: "Disponible", categoria: "Cigarrillos" },
  { id: 11, nombre: "Jugo Cifrut", precio: 5500, stock: 60, estado: "Disponible", categoria: "Bebidas" },
  { id: 12, nombre: "Gaseosa Big Cola", precio: 4500, stock: 80, estado: "Disponible", categoria: "Bebidas" },
  { id: 13, nombre: "Gatorade", precio: 3500, stock: 100, estado: "Disponible", categoria: "Bebidas" },
  { id: 14, nombre: "Todo Rico", precio: 4500, stock: 80, estado: "Disponible", categoria: "Snacks" },
]

function TablaCervezas() {
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem("cervezasDistribuidora")
    return guardados ? JSON.parse(guardados) : productosIniciales
  })
  
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({ nombre: "", precio: "", stock: "", estado: "Disponible", categoria: "Cervezas" })

  useEffect(() => {
    localStorage.setItem("cervezasDistribuidora", JSON.stringify(productos))
  }, [productos])

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const guardar = (e) => {
    e.preventDefault()
    if (editando) {
      setProductos(productos.map(p => p.id === editando.id ? { ...form, id: p.id, precio: Number(form.precio), stock: Number(form.stock) } : p))
      Swal.fire("Actualizado", "Producto actualizado correctamente", "success")
    } else {
      const nuevo = {
        ...form,
        id: Math.max(0, ...productos.map(p => p.id)) + 1,
        precio: Number(form.precio),
        stock: Number(form.stock)
      }
      setProductos([...productos, nuevo])
      Swal.fire("Agregado", "Producto agregado al inventario", "success")
    }
    setMostrarFormulario(false)
    setEditando(null)
    setForm({ nombre: "", precio: "", stock: "", estado: "Disponible", categoria: "Cervezas" })
  }

  const eliminar = (id) => {
    Swal.fire({
      title: "¿Eliminar producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      confirmButtonColor: "#dc3545"
    }).then((r) => {
      if (r.isConfirmed) {
        setProductos(productos.filter(c => c.id !== id))
        Swal.fire("Eliminado", "", "success")
      }
    })
  }

  const abrirEditar = (producto) => {
    setEditando(producto)
    setForm(producto)
    setMostrarFormulario(true)
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-warning m-0">Inventario de Productos</h2>
        <button className="btn text-dark fw-bold px-4" style={{ backgroundColor: "#d4af37" }} onClick={() => { setMostrarFormulario(!mostrarFormulario); setEditando(null); setForm({ nombre: "", precio: "", stock: "", estado: "Disponible", categoria: "Cervezas" }) }}>
          + Nuevo Producto
        </button>
      </div>

      {mostrarFormulario && (
        <div className="card p-4 mb-4 bg-dark text-white border-warning shadow-lg">
          <h5 className="text-warning mb-4">
            {editando ? "✏️ Editar Producto" : "➕ Nuevo Producto"}
          </h5>
          
          <form onSubmit={guardar}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label text-secondary small">Nombre del Producto</label>
                <input type="text" name="nombre" className="form-control bg-dark text-white border-secondary" placeholder="Ej: Cerveza Poker" value={form.nombre} onChange={manejarCambio} required />
              </div>

              <div className="col-md-6">
                <label className="form-label text-secondary small">Categoría</label>
                <select name="categoria" className="form-select bg-dark text-white border-secondary" value={form.categoria} onChange={manejarCambio}>
                  <option value="Cervezas">🍺 Cervezas</option>
                  <option value="Licores">🥃 Licores</option>
                  <option value="Cigarrillos">🚬 Cigarrillos</option>
                  <option value="Bebidas">🧃 Bebidas</option>
                  <option value="Snacks">🍟 Snacks</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label text-secondary small">Precio (COP)</label>
                <input type="number" name="precio" className="form-control bg-dark text-white border-secondary" placeholder="Ej: 3500" min="1" value={form.precio} onChange={manejarCambio} required />
              </div>

              <div className="col-md-4">
                <label className="form-label text-secondary small">Stock</label>
                <input type="number" name="stock" className="form-control bg-dark text-white border-secondary" placeholder="Ej: 100" min="0" value={form.stock} onChange={manejarCambio} required />
              </div>

              <div className="col-md-4">
                <label className="form-label text-secondary small">Estado</label>
                <select name="estado" className="form-select bg-dark text-white border-secondary" value={form.estado} onChange={manejarCambio}>
                  <option value="Disponible">Disponible</option>
                  <option value="Agotado">Agotado</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button type="button" className="btn btn-outline-light" onClick={() => { setMostrarFormulario(false); setEditando(null) }}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-warning fw-bold px-4">
                {editando ? "Guardar Cambios" : "Agregar Producto"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 👇 TABLA NATIVA CON ANCHO CONTROLADO Y ESTILOS OSCUROS 👇 */}
      <div className="hp-table-wrap rounded-4 shadow-sm tabla-inventario" style={{ border: "1px solid #333" }}>
        <table className="hp-table m-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td className="fw-bold">{prod.nombre}</td>
                <td>
                  <span className="badge bg-secondary text-warning border border-warning">
                    {prod.categoria}
                  </span>
                </td>
                <td className="text-success fw-bold">${prod.precio.toLocaleString()}</td>
                <td>{prod.stock}</td>
                <td>
                  <span className={`badge ${prod.estado === "Disponible" ? "bg-success" : "bg-danger"}`}>
                    {prod.estado}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2 justify-content-center">
                    <button className="btn btn-sm btn-outline-warning" onClick={() => abrirEditar(prod)}>✏️</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(prod.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TablaCervezas