import { useState, useEffect } from "react"
import Navbar from "../Components/Navbar"          
import Hero from "../Components/Hero"              
import Productos from "../Pages/Productos"                    
import Contacto from "../Components/Contacto"      
import Footer from "../Components/Footer"          
import LoginModal from "../Components/LoginModal"  
import MascotaAsistente from "../Components/MascotaAsistente" // 👈 Importamos la mascota

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

      {/* 👇 Aquí agregamos a Princesa */}
      <MascotaAsistente />
    </>
  )
}

export default Home