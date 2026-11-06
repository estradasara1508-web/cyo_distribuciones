import { useState } from "react"
import Swal from "sweetalert2"
import Sidebar from "../../Components/Sidebar"
import CatalogoCliente from "../../Components/CatalogoCliente"
import PerfilCliente from "../../Components/PerfilCliente"
import "../Admin/Dashboard.css"

const opciones = ["Catálogo", "Mis pedidos", "Mi perfil"]

function ClienteDashboard({ onLogout }) {
  const [seccion, setSeccion] = useState("Catálogo")
  const email = localStorage.getItem("emailCYO") || "cliente@cyo.com"

  const confirmarSalida = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      confirmButtonColor: "#b45309",
    }).then((r) => {
      if (r.isConfirmed) onLogout()
    })
  }

  return (
    <div className="hp-dashboard">
      <Sidebar
        titulo="Espacio del cliente"
        opciones={opciones}
        seccion={seccion}
        cambiarSeccion={setSeccion}
        cerrarSesion={confirmarSalida}
      />

      <main className="hp-main">
        <header className="hp-header">
          <div>
            <p className="hp-eyebrow">PANEL DEL CLIENTE</p>
            <h1>{seccion}</h1>
            <p className="hp-subtitle">Hola, {email} 👋</p>
          </div>
          <div className="hp-user">
            <span className="hp-avatar">C</span>
            <span>{email}</span>
          </div>
        </header>

        <section className="hp-panel">
          {seccion === "Catálogo" && <CatalogoCliente />}
          {seccion === "Mi perfil" && <PerfilCliente email={email} />}
          {seccion === "Mis pedidos" && (
             <p className="text-muted">Aquí podrás ver tus pedidos (próximamente).</p>
          )}
        </section>

        <footer className="hp-footer">
          Distribuidora C.Y.O · Proyecto React
        </footer>
      </main>
    </div>
  )
}

export default ClienteDashboard