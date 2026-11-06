import { useState } from "react"
import Swal from "sweetalert2"

function FormularioLogin({ onLogin, onLoginExitoso }) {
  const [correo, setCorreo] = useState("")
  const [password, setPassword] = useState("")

  const iniciarSesion = (e) => {
    e.preventDefault()
    let rol = null

    // Validación del Admin
    if (correo.trim() === "superadmin@cyo.com" && password === "12345") {
      rol = "admin"
    } else {
      // Validación de clientes registrados en el localStorage
      const usuariosGuardados = JSON.parse(localStorage.getItem("usuariosCYO") || "[]")
      const usuarioEncontrado = usuariosGuardados.find(
        u => u.correo === correo.trim() && u.password === password
      )
      if (usuarioEncontrado) {
        rol = usuarioEncontrado.rol
      }
    }

    if (rol) {
      Swal.fire({
        icon: "success",
        title: "Bienvenid@",
        text: "Sesión iniciada correctamente",
        confirmButtonColor: "#d4af37",
        background: "#1a1a1a",
        color: "#ffffff"
      }).then(() => {
        onLogin(rol, correo.trim())
        onLoginExitoso() // Cierra el modal
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "Acceso denegado",
        text: "Correo o contraseña incorrectos",
        confirmButtonColor: "#d4af37",
        background: "#1a1a1a",
        color: "#ffffff"
      })
    }
  }

  return (
    <form onSubmit={iniciarSesion}>
      <div className="mb-3">
        <label className="form-label" style={{ fontSize: "0.9rem", color: "#ccc" }}>Correo electrónico</label>
        <input 
          type="email" 
          className="form-control bg-dark text-white border-secondary"
          placeholder="correo@ejemplo.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)} 
          required 
        />
      </div>

      <div className="mb-4">
        <label className="form-label" style={{ fontSize: "0.9rem", color: "#ccc" }}>Contraseña</label>
        <input 
          type="password" 
          className="form-control bg-dark text-white border-secondary"
          placeholder="••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>

      <button 
        type="submit" 
        className="btn w-100 fw-bold d-flex justify-content-between align-items-center" 
        style={{ backgroundColor: "#d4af37", color: "#000", padding: "0.8rem 1.5rem", borderRadius: "10px" }}
      >
        <span>Iniciar Sesión</span>
        <span>→</span>
      </button>

      <p className="text-center mt-3 mb-0" style={{ fontSize: "0.75rem", color: "#666" }}>
        
      </p>
    </form>
  )
}

export default FormularioLogin