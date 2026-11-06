import { useState, useEffect } from "react"

function TablaClientes() {
  const [clientes, setClientes] = useState([])

  useEffect(() => {
    // Obtenemos los perfiles guardados (llave: correo, valor: datos)
    const perfiles = JSON.parse(localStorage.getItem("perfilesClientes") || "{}")
    // Lo convertimos a un array para la tabla
    const arrayClientes = Object.keys(perfiles).map(email => ({
      email,
      ...perfiles[email]
    }))
    setClientes(arrayClientes)
  }, [])

  return (
    <section className="hp-panel">
      <h2>Directorio de Clientes</h2>
      <div className="hp-table-wrap mt-3">
        <table className="hp-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Dirección</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length === 0 && (
              <tr><td colSpan="4" className="text-center text-muted">No hay clientes registrados</td></tr>
            )}
            {clientes.map(c => (
              <tr key={c.email}>
                <td>{c.nombre}</td>
                <td>{c.email}</td>
                <td>{c.telefono}</td>
                <td>{c.direccion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default TablaClientes