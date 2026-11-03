import { Link } from "react-router-dom"

function Navbar({ abrirLogin, tema, cambiarTema }) {
  return (
    <header>
      <nav>
        <h1>🍺 C.Y.O DISTRIBUCIONES</h1>
        <ul>
          <li><a href="#categorias">Productos</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
          <li><a href="#contacto">Contacto</a></li>
          
          <li>
            <button onClick={abrirLogin}>Login</button>
          </li>
          
          <li>
            <button className="tema-btn" onClick={cambiarTema}>
              {tema === "oscuro" ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar