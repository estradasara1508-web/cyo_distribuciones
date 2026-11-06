import { useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import Home from "../src/Pages/Home"
import Dashboard from "../src/Pages/Admin/Dashboard" // Asegúrate que tu carpeta sea admin o Admin
import ClienteDashboard from "../src/Pages/Cliente/ClienteDashboard" // Asegúrate que sea cliente o Cliente
import ProtectedRoute from "../src/Components/ProtectedRoute"

function App() {
  const [usuario, setUsuario] = useState(() => localStorage.getItem("usuarioCYO"))
  const navigate = useNavigate()

  const iniciarSesion = (rol, email) => {
    setUsuario(rol)
    localStorage.setItem("usuarioCYO", rol)
    localStorage.setItem("emailCYO", email)
    // Redirige al panel correspondiente
    navigate(rol === "admin" ? "/admin" : "/cliente")
  }

  const cerrarSesion = () => {
    setUsuario(null)
    localStorage.removeItem("usuarioCYO")
    localStorage.removeItem("emailCYO")
    navigate("/")
  }

  return (
    <Routes>
      <Route path="/" element={<Home onLogin={iniciarSesion} />} />
      
      <Route path="/admin" element={
        <ProtectedRoute usuario={usuario} rolPermitido="admin">
          <Dashboard onLogout={cerrarSesion} />
        </ProtectedRoute>
      } />
      
      <Route path="/cliente" element={
        <ProtectedRoute usuario={usuario} rolPermitido="cliente">
          <ClienteDashboard onLogout={cerrarSesion} />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App