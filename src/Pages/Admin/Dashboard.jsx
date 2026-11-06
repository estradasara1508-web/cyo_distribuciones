import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import Sidebar from "../../Components/Sidebar"
import "./Dashboard.css"

// Importación de las tablas
import TablaCervezas from "../../Components/TablaCervezas"
import TablaPedidos from "../../Components/TablaPedidos"
import TablaClientes from "../../Components/TablaClientes"

// 👇 1. Cambiamos "Cervezas" por "Productos"
const secciones = ["Resumen", "Productos", "Pedidos", "Clientes"]

function Dashboard({ onLogout }) {
  const [seccion, setSeccion] = useState("Resumen")
  const [cervezas, setCervezas] = useState([])
  const [pedidos, setPedidos] = useState([])

  // Recalcula al cambiar de sección para ver datos frescos
  useEffect(() => {
    const c = localStorage.getItem("cervezasDistribuidora")
    const p = localStorage.getItem("pedidosDistribuidora")
    setCervezas(c ? JSON.parse(c) : [])
    setPedidos(p ? JSON.parse(p) : [])
  }, [seccion])

  const confirmarSalida = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Regresarás a la página principal",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#b45309",
    }).then((r) => {
      if (r.isConfirmed) onLogout()
    })
  }

  // Métricas del resumen
  const pendientes = pedidos.filter((p) => p.estado === "Pendiente").length
  const entregados = pedidos.filter((p) => p.estado === "Entregado").length
  const stockTotal = cervezas.reduce((a, c) => a + Number(c.stock || 0), 0)
  const clientesUnicos = new Set(pedidos.map((p) => p.cliente)).size

  return (
    <div className="hp-dashboard">
      <Sidebar
        titulo="Administración"
        opciones={secciones}
        seccion={seccion}
        cambiarSeccion={setSeccion}
        cerrarSesion={confirmarSalida}
      />

      <main className="hp-main">
        <header className="hp-header">
          <div>
            <p className="hp-eyebrow">PANEL ADMINISTRATIVO</p>
            <h1>
              {seccion === "Resumen"
                ? "Bienvenido a la Distribuidora"
                : seccion}
            </h1>
            <p className="hp-subtitle">
              {seccion === "Resumen"
                ? "Resumen general de la operación"
                : "Consulta y gestión del catálogo y pedidos"}
            </p>
          </div>
          <div className="hp-user">
            <span className="hp-avatar">A</span>
            <span>Administrador</span>
          </div>
        </header>

        {seccion === "Resumen" && (
          <>
            <section className="hp-stats">
              {[
                // 👇 2. Cambiamos "Cervezas" por "Productos" en las tarjetas de resumen
                { titulo: "Productos", valor: cervezas.length, icono: "📦" },
                { titulo: "Pedidos", valor: pedidos.length, icono: "🧾" },
                { titulo: "Pendientes", valor: pendientes, icono: "⏳" },
                { titulo: "Entregados", valor: entregados, icono: "✔️" },
                { titulo: "Stock total", valor: stockTotal, icono: "📊" },
                { titulo: "Clientes", valor: clientesUnicos, icono: "👤" },
              ].map((d) => (
                <article className="hp-stat" key={d.titulo}>
                  <div className="hp-stat-top">
                    <span>{d.titulo}</span>
                    <span className="hp-stat-icon">{d.icono}</span>
                  </div>
                  <strong>{d.valor}</strong>
                </article>
              ))}
            </section>

            <section className="hp-panel">
              <div className="hp-panel-header">
                <div>
                  <h2>Pedidos recientes</h2>
                  <p>Últimos movimientos de la distribuidora</p>
                </div>
              </div>
              <div className="hp-table-wrap">
                <table className="hp-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Cliente</th>
                      {/* 👇 3. Cambiamos "Cerveza" por "Producto" en la tabla */}
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedidos.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center text-muted py-3">
                          Aún no hay pedidos registrados
                        </td>
                      </tr>
                    )}
                    {pedidos.slice(-5).reverse().map((p) => (
                      <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.cliente}</td>
                        {/* 👇 4. Cambiamos p.cerveza por p.producto (como lo guardamos en el nuevo formulario) */}
                        <td>{p.producto || p.cerveza}</td>
                        <td>{p.cantidad}</td>
                        <td>
                          <span
                            className={`hp-status ${
                              p.estado === "Entregado"
                                ? "confirmed"
                                : "pending"
                            }`}
                          >
                            {p.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {/* 👇 5. Cambiamos la condición para que cargue TablaCervezas cuando la sección sea "Productos" */}
        {seccion === "Productos" && <TablaCervezas />}
        {seccion === "Pedidos" && <TablaPedidos />}
        {seccion === "Clientes" && <TablaClientes />}

        <footer className="hp-footer">
          Distribuidora de Cervezas · Proyecto React
        </footer>
      </main>
    </div>
  )
}

export default Dashboard