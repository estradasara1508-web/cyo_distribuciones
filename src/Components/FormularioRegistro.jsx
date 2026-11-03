import { useState } from "react"
import Swal from "sweetalert2"

function FormularioRegistro({ alRegistrarseExitosamente }) {
  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [password, setPassword] = useState("")
  const [esMayor, setEsMayor] = useState(false)

  const registrar = (e) => {
    e.preventDefault()

    if (!esMayor) {
      Swal.fire("Atención", "Debes confirmar que eres mayor de 18 años.", "warning")
      return
    }

    // Obtenemos los usuarios (o un array vacío)
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuariosCYO") || "[]")

    // Verificamos si el correo ya está registrado
    if (usuariosGuardados.find(u => u.correo === correo.trim())) {
      Swal.fire("Error", "Este correo ya está registrado.", "error")
      return
    }

    const nuevoUsuario = {
      nombre: nombre.trim(),
      correo: correo.trim(),
      password: password,
      rol: "cliente"
    }

    localStorage.setItem("usuariosCYO", JSON.stringify([...usuariosGuardados, nuevoUsuario]))

    Swal.fire({
      icon: "success",
      title: "¡Registro exitoso!",
      text: "Ahora puedes iniciar sesión con tu cuenta.",
      confirmButtonColor: "#d4af37",
      background: "#1a1a1a",
      color: "#ffffff"
    }).then(() => {
      alRegistrarseExitosamente() // Avisa al modal para que cambie a la vista de Login
    })
  }

  return (
    <form onSubmit={registrar}>
      <div className="mb-3">
        <label className="form-label" style={{ fontSize: "0.9rem", color: "#ccc" }}>Nombre completo</label>
        <input 
          type="text" 
          className="form-control bg-dark text-white border-secondary"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)} 
          required 
        />
      </div>

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

      <div className="mb-3">
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

      <div className="form-check mb-4">
        <input 
          className="form-check-input" 
          type="checkbox" 
          id="mayorEdadRegistro"
          checked={esMayor}
          onChange={(e) => setEsMayor(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="mayorEdadRegistro" style={{ fontSize: "0.85rem", color: "#ccc" }}>
          Confirmo que soy mayor de 18 años.
        </label>
      </div>

      <button 
        type="submit" 
        className="btn w-100 fw-bold d-flex justify-content-between align-items-center" 
        style={{ backgroundColor: "#d4af37", color: "#000", padding: "0.8rem 1.5rem", borderRadius: "10px" }}
      >
        <span>Crear Cuenta</span>
        <span>→</span>
      </button>
    </form>
  )
}

export default FormularioRegistro