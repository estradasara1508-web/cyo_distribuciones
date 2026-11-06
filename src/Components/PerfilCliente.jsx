import { useState, useEffect } from "react"
import Swal from "sweetalert2"

function PerfilCliente({ email }) {
  const [datos, setDatos] = useState({
    nombre: "",
    correo: email, // El correo viene de la sesión
    fechaNacimiento: "",
    telefono: "",
    direccion: ""
  })
  
  const [modoEdicion, setModoEdicion] = useState(false)
  const [cargando, setCargando] = useState(true)

  // Al cargar el componente, buscamos si el cliente ya tiene datos guardados
  useEffect(() => {
    const perfiles = JSON.parse(localStorage.getItem("perfilesClientes") || "{}")
    if (perfiles[email]) {
      setDatos(perfiles[email])
      setModoEdicion(false)
    } else {
      setModoEdicion(true) // Si no tiene datos, mostramos el formulario
    }
    setCargando(false)
  }, [email])

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  const guardar = (e) => {
    e.preventDefault()
    const perfiles = JSON.parse(localStorage.getItem("perfilesClientes") || "{}")
    
    // Guardamos la información asociada al correo del cliente
    perfiles[email] = datos
    localStorage.setItem("perfilesClientes", JSON.stringify(perfiles))
    
    Swal.fire({
      icon: "success",
      title: "Datos guardados",
      text: "Tu perfil ha sido actualizado.",
      confirmButtonColor: "#d4af37",
      background: "#1a1a1a",
      color: "#ffffff"
    })
    
    setModoEdicion(false) // Cambiamos a la vista de solo lectura
  }

  if (cargando) return <p className="text-white">Cargando perfil...</p>

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-warning m-0">Mi Perfil</h2>
        {!modoEdicion && (
          <button 
            className="btn btn-outline-warning fw-bold" 
            onClick={() => setModoEdicion(true)}
          >
            ✏️ Editar mis datos
          </button>
        )}
      </div>

      {modoEdicion ? (
        // ================== VISTA DE FORMULARIO ==================
        <form onSubmit={guardar} className="p-4 rounded" style={{ background: "#222", border: "1px solid var(--hp-gold)", maxWidth: "600px" }}>
          <div className="mb-3">
            <label className="form-label text-white">Nombre Completo</label>
            <input type="text" className="form-control bg-dark text-white border-secondary" name="nombre" value={datos.nombre} onChange={manejarCambio} required />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Correo Electrónico</label>
            <input type="email" className="form-control bg-dark text-white border-secondary" name="correo" value={datos.correo} disabled />
            <small className="text-muted">El correo no se puede modificar.</small>
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Fecha de Nacimiento</label>
            <input type="date" className="form-control bg-dark text-white border-secondary" name="fechaNacimiento" value={datos.fechaNacimiento} onChange={manejarCambio} required />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Teléfono</label>
            <input type="text" className="form-control bg-dark text-white border-secondary" name="telefono" value={datos.telefono} onChange={manejarCambio} required />
          </div>

          <div className="mb-4">
            <label className="form-label text-white">Dirección de Entrega</label>
            <input type="text" className="form-control bg-dark text-white border-secondary" name="direccion" value={datos.direccion} onChange={manejarCambio} required />
          </div>

          <div className="d-flex gap-2">
            {localStorage.getItem("perfilesClientes") && (
              <button type="button" className="btn btn-outline-light w-50" onClick={() => setModoEdicion(false)}>Cancelar</button>
            )}
            <button type="submit" className="btn btn-warning fw-bold w-50">Guardar Datos</button>
          </div>
        </form>
      ) : (
        // ================== VISTA DE SOLO LECTURA ==================
        <div className="p-4 rounded" style={{ background: "#222", border: "1px solid var(--hp-border)", maxWidth: "600px" }}>
          <div className="row mb-3">
            <div className="col-sm-4 text-warning">Nombre:</div>
            <div className="col-sm-8 text-white">{datos.nombre}</div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4 text-warning">Correo:</div>
            <div className="col-sm-8 text-white">{datos.correo}</div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4 text-warning">F. Nacimiento:</div>
            <div className="col-sm-8 text-white">{datos.fechaNacimiento}</div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4 text-warning">Teléfono:</div>
            <div className="col-sm-8 text-white">{datos.telefono}</div>
          </div>
          <div className="row">
            <div className="col-sm-4 text-warning">Dirección:</div>
            <div className="col-sm-8 text-white">{datos.direccion}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PerfilCliente