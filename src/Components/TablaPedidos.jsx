import { useState, useEffect } from "react"

function TablaPedidos() {
  const [pedidos, setPedidos] = useState([])

  useEffect(() => {
    const guardados = localStorage.getItem("pedidosDistribuidora")
    setPedidos(guardados ? JSON.parse(guardados) : [])
  }, [])

  return (
    <section className="hp-panel">
      <h2>Pedidos de Clientes</h2>
      <div className="hp-table-wrap mt-3">
        <table className="hp-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.length === 0 && (
              <tr><td colSpan="6" className="text-center text-muted">No hay pedidos aún</td></tr>
            )}
            {pedidos.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.cliente}</td>
                <td>{p.producto}</td>
                <td>{p.cantidad}</td>
                <td>{p.fecha}</td>
                <td><span className="hp-status pending">{p.estado}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default TablaPedidos