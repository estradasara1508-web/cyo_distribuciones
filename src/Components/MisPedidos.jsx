import { useState, useEffect } from "react"

function MisPedidos({ emailCliente }) {
  const [pedidos, setPedidos] = useState([])

  useEffect(() => {
    // Leemos todos los pedidos que hay en el sistema
    const guardados = JSON.parse(localStorage.getItem("pedidosDistribuidora") || "[]")
    
    // Filtramos SOLO los del cliente que está logueado
    const misPedidos = guardados.filter(p => p.cliente === emailCliente)
    
    // Los mostramos en orden inverso (el más reciente primero)
    setPedidos(misPedidos.reverse())
  }, [emailCliente])

  return (
    <div>
      <h2 className="text-warning mb-4">Mis Pedidos</h2>
      
      {pedidos.length === 0 ? (
        <p className="text-muted">Aún no has realizado ningún pedido.</p>
      ) : (
        <div className="hp-table-wrap">
          <table className="hp-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map(p => (
                <tr key={p.id}>
                  <td>#{p.id}</td>
                  <td>{p.producto}</td>
                  <td>{p.cantidad}</td>
                  <td>{p.fecha}</td>
                  <td>
                    <span className={`hp-status ${p.estado === "Entregado" ? "confirmed" : "pending"}`}>
                      {p.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default MisPedidos