import { useState, useEffect } from "react"
import DataTable from "react-data-table-component"
import Swal from "sweetalert2"

// Productos iniciales (los mismos que tienes en tu inicio)
const cervezasIniciales = [
  { id: 1, nombre: "Cerveza Poker", precio: 3500, stock: 100, estado: "Disponible" },
  { id: 2, nombre: "Cerveza Águila", precio: 2800, stock: 80, estado: "Disponible" },
]

function TablaCervezas() {
  const [cervezas, setCervezas] = useState(() => {
    const guardadas = localStorage.getItem("cervezasCYO")
    return guardadas ? JSON.parse(guardadas) : cervezasIniciales
  })
  
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({ nombre: "", precio: "", stock: "", estado: "Disponible" })

  // Guardar en localStorage cada vez que cambie la lista
  useEffect(() => {
    localStorage.setItem("cervezasCYO", JSON.stringify(cervezas))
  }, [cervezas])

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const guardar = (e) => {
    e.preventDefault()
    if (editando) {
      // Editar
      setCervezas(cervezas.map(c => c.id === editando.id ? { ...form, id: c.id } : c))
      Swal.fire("Actualizado", "Producto actualizado correctamente", "success")
    } else {
      // Crear nuevo
      const nuevo = {
        ...form,
        id: Math.max(0, ...cervezas.map(c => c.id)) + 1,
        precio: Number(form.precio),
        stock: Number(form.stock)
      }
      setCervezas([...cervezas, nuevo])
      Swal.fire("Agregado", "Producto agregado al inventario", "success")
    }
    setMostrarFormulario(false)
    setEditando(null)
    setForm({ nombre: "", precio: "", stock: "", estado: "Disponible" })
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
        setCervezas(cervezas.filter(c => c.id !== id))
        Swal.fire("Eliminado", "", "success")
      }
    })
  }

  const abrirEditar = (cerveza) => {
    setEditando(cerveza)
    setForm(cerveza)
    setMostrarFormulario(true)
  }

  const columnas = [
    { name: "ID", selector: row => row.id, sortable: true, width: "70px" },
    { name: "Producto", selector: row => row.nombre, sortable: true },
    { name: "Precio", selector: row => row.precio, format: row => `$${row.precio.toLocaleString()}`, sortable: true },
    { name: "Stock", selector: row => row.stock, sortable: true },
    { name: "Estado", selector: row => row.estado, sortable: true },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-outline-primary" onClick={() => abrirEditar(row)}>✏️</button>
          <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(row.id)}>🗑️</button>
        </div>
      )
    }
  ]

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h2>Inventario de Cervezas</h2>
        <button className="btn text-dark fw-bold" style={{ backgroundColor: "#d4af37" }} onClick={() => { setMostrarFormulario(!mostrarFormulario); setEditando(null); setForm({ nombre: "", precio: "", stock: "", estado: "Disponible" }) }}>
          + Nuevo Producto
        </button>
      </div>

      {mostrarFormulario && (
        <div className="card p-3 mb-4 bg-dark text-white border-warning">
          <form onSubmit={guardar} className="row g-3">
            <div className="col-md-4">
              <input type="text" name="nombre" className="form-control bg-dark text-white border-secondary" placeholder="Nombre de la cerveza" value={form.nombre} onChange={manejarCambio} required />
            </div>
            <div className="col-md-2">
              <input type="number" name="precio" className="form-control bg-dark text-white border-secondary" placeholder="Precio" value={form.precio} onChange={manejarCambio} required />
            </div>
            <div className="col-md-2">
              <input type="number" name="stock" className="form-control bg-dark text-white border-secondary" placeholder="Stock" value={form.stock} onChange={manejarCambio} required />
            </div>
            <div className="col-md-2">
              <select name="estado" className="form-select bg-dark text-white border-secondary" value={form.estado} onChange={manejarCambio}>
                <option value="Disponible">Disponible</option>
                <option value="Agotado">Agotado</option>
              </select>
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-warning w-100 fw-bold">{editando ? "Actualizar" : "Guardar"}</button>
            </div>
          </form>
        </div>
      )}

      <DataTable
        columns={columnas}
        data={cervezas}
        pagination
        highlightOnHover
        theme="dark"
        noDataComponent="No hay cervezas registradas"
      />
    </div>
  )
}

export default TablaCervezas