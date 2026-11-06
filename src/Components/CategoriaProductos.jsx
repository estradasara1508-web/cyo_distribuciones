import ProductCard from "./ProductCard"

function CategoriaProductos({ titulo, subtitulo, productos }) {
  return (
    <section className="categoria-seccion">
      <h2 className="categoria-titulo">
        {titulo} <span>{subtitulo}</span>
      </h2>
      
      <div className="contenedor-productos">
        {productos.map((producto) => (
          <ProductCard
            key={producto.id}
            imagen={producto.imagen}
            nombre={producto.nombre}
            precio={producto.precio}
            stock={producto.stock}
          />
        ))}
      </div>
    </section>
  )
}

export default CategoriaProductos