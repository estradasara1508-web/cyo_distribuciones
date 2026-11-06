function ProductCard({ imagen, nombre, precio, stock }) {
  const agotado = stock === 0

  return (
    <div className="producto-card">
      <div className="producto-imagen">
        {imagen ? (
          <img src={imagen} alt={nombre} />
        ) : (
          <span style={{ fontSize: "4rem" }}>🍺</span>
        )}
      </div>

      <h3>
        {nombre}
        {agotado && <span className="badge-agotado">Agotado</span>}
      </h3>
      
      <span>${precio.toLocaleString("es-CO")}</span>

      <button className="agregar-carrito" disabled={agotado}>
        {agotado ? "Sin stock" : "Ver detalles"}
      </button>
    </div>
  )
}

export default ProductCard