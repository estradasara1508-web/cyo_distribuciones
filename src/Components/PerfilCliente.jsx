import { useState, useEffect } from "react"
import Swal from "sweetalert2"

function PerfilCliente({ email }) {
  const [datos, setDatos] = useState({
    nombre: "",
    telefono: "",
    direccion: ""
  })

  useEffect(() => {
    // Buscamos si ya tiene datos guardados
    const perfiles = JSON.parse(localStorage.getItem("perfilesClientes") || "{}")
    if (perfiles[email]) {
      setDatos(perfiles[email])
    }
  }, [email])

  const guardar = (e) => {
    e.preventDefault()
    const perfiles = JSON.parse(localStorage.getItem("perfilesClientes") || "{}")
    perfiles[email] = datos
    localStorage.setItem("perfilesClientes", JSON.stringify(perfiles))
    
    Swal.fire("Guardado", "Tus datos se actualizaron correctamente", "success")
  }

  return (
    <div>
      <h2 className="mb-3 text-warning">Mi Perfil</h2>
      <form onSubmit={guardar} className="p-3 rounded" style={{ background: "#222", maxWidth: "500px" }}>
        <div className="mb-3">
          <label className="form-label">Correo (Registrado)</label>
          <input type="text" className="form-control bg-dark text-white" value={email} disabled />
        </div>
        <div className="mb-3">
          <label className="form-label">Nombre Completo</label>
          <input type="text" className="form-control bg-dark text-white" value={datos.nombre} onChange={e => setDatos({...datos, nombre: e.target.value})} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input type="text" className="form-control bg-dark text-white" value={datos.telefono} onChange={e => setDatos({...datos, telefono: e.target.value})} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección de Entrega</label>
          <input type="text" className="form-control bg-dark text-white" value={datos.direccion} onChange={e => setDatos({...datos, direccion: e.target.value})} required />
        </div>
        <button type="submit" className="btn btn-warning fw-bold w-100">Guardar Datos</button>
      </form>
    </div>
  )
}

export default PerfilCliente