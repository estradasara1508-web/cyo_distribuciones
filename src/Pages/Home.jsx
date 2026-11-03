import { useState, useEffect } from "react"
import Navbar from "../Components/Navbar"          // 👈 Ruta ajustada
import Hero from "../Components/Hero"              // 👈 Ruta ajustada
import Productos from "../Pages/Productos"                    // Si Productos está en la misma carpeta que Home
import Contacto from "../Components/Contacto"      // 👈 Ruta ajustada
import Footer from "../Components/Footer"          // 👈 Ruta ajustada
import LoginModal from "../Components/LoginModal"  // 👈 Ruta ajustada

function Home({ onLogin }) {
  const [mostrarLogin, setMostrarLogin] = useState(false)
  
  // Estado para el tema oscuro/claro
  const [tema, setTema] = useState(() => {
    return localStorage.getItem("temaCYO") || "oscuro"
  })

  useEffect(() => {
    if (tema === "claro") {
      document.body.classList.add("tema-claro")
    } else {
      document.body.classList.remove("tema-claro")
    }
    localStorage.setItem("temaCYO", tema)
  }, [tema])

  const cambiarTema = () => {
    setTema(tema === "oscuro" ? "claro" : "oscuro")
  }

  return (
    <>
      <Navbar 
        abrirLogin={() => setMostrarLogin(true)} 
        tema={tema}
        cambiarTema={cambiarTema}
      />
      
      <Hero />
      
      <Productos />
      
      <Contacto />

      <Footer />

      <LoginModal 
        mostrar={mostrarLogin} 
        cerrar={() => setMostrarLogin(false)} 
        onLogin={onLogin} 
      />
    </>
  )
}

export default Home