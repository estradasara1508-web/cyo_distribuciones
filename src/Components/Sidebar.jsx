function Sidebar({
  titulo = "Administración",
  opciones,
  seccion,
  cambiarSeccion,
  cerrarSesion,
}) {
  const iconos = {
    // admin
    Resumen: "bi-grid-1x2",
    Cervezas: "bi-cup-straw",
    Pedidos: "bi-receipt",
    Clientes: "bi-people",
    // cliente
    Catálogo: "bi-shop",
    "Mis pedidos": "bi-receipt",
    "Mi perfil": "bi-person-badge",
  }

  return (
    <aside className="hp-sidebar">
      <div className="hp-brand">
        <span className="hp-brand-icon">🍺</span>
        <div>
          <strong>Distribuidora</strong>
          <small>{titulo}</small>
        </div>
      </div>
      <nav className="hp-menu" aria-label="Menú">
        {opciones.map((item) => (
          <button
            key={item}
            type="button"
            className={`hp-menu-item ${seccion === item ? "active" : ""}`}
            onClick={() => cambiarSeccion(item)}
          >
            <span aria-hidden="true">
              <i className={`bi ${iconos[item] || "bi-chevron-right"}`}></i>
            </span>
            {item}
          </button>
        ))}
      </nav>
      <button className="hp-logout" type="button" onClick={cerrarSesion}>
        ↪ Cerrar sesión
      </button>
    </aside>
  )
}

export default Sidebar