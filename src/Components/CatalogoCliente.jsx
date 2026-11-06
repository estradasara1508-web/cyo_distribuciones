import { useState, useEffect } from "react"

// Importamos todas las imágenes (asegúrate que los nombres coincidan con tu carpeta assets)
import poker from "../assets/Cerveza Poker.jpg"
import aguila from "../assets/Cerveza Aguila.jpg"
import clubColombia from "../assets/Club colombia.jpg"
import costena from "../assets/Cerveza costeña.jpg"
import aguardienteAmarillo from "../assets/Aguardiente amarillo.jpg"
import aguardienteAntioqueno from "../assets/Aguardiente antioqueño.jpg"
import aguardienteNectar from "../assets/Aguardiente nectar.jpg"
import fourLoko from "../assets/Four loko.jpg"
import rothmans from "../assets/Rothmans.jpg"
import lucky from "../assets/Lucky.jpg"
import cifrut from "../assets/Cifrut.jpg"
import bigCola from "../assets/Big cola.jpg"
import gatorade from "../assets/Gatorade.jpg"
import todoRico from "../assets/Todo Rico.jpg"

// Diccionario para asociar el nombre del producto con la imagen
const imagenesProductos = {
  "Cerveza Poker": poker,
  "Cerveza Águila": aguila,
  "Club Colombia": clubColombia,
  "Cerveza Costeña": costena,
  "Aguardiente Amarillo": aguardienteAmarillo,
  "Aguardiente Antioqueño": aguardienteAntioqueno,
  "Aguardiente Néctar": aguardienteNectar,
  "Four Loko": fourLoko,
  "Cigarrillos Rothmans": rothmans,
  "Cigarrillos Lucky Strike": lucky,
  "Jugo Cifrut": cifrut,
  "Gaseosa Big Cola": bigCola,
  "Gatorade": gatorade,
  "Todo Rico": todoRico
}

function CatalogoCliente({ alSeleccionarProducto }) {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    // Intentamos leer los productos del admin
    const guardados = localStorage.getItem("cervezasDistribuidora")
    if (guardados) {
      setProductos(JSON.parse(guardados))
    } else {
      // Si no hay, mostramos una lista por defecto (igual a la de tu página principal)
      setProductos([
        { id: 1, nombre: "Cerveza Poker", precio: 3500, stock: 100 },
        { id: 2, nombre: "Cerveza Águila", precio: 2800, stock: 80 },
        { id: 3, nombre: "Club Colombia", precio: 4000, stock: 50 },
        { id: 4, nombre: "Aguardiente Amarillo", precio: 56000, stock: 20 },
        { id: 5, nombre: "Aguardiente Antioqueño", precio: 52000, stock: 15 },
        { id: 6, nombre: "Four Loko", precio: 15000, stock: 40 },
        { id: 7, nombre: "Cigarrillos Rothmans", precio: 8000, stock: 200 },
        { id: 8, nombre: "Jugo Cifrut", precio: 5500, stock: 60 },
        { id: 9, nombre: "Gaseosa Big Cola", precio: 4500, stock: 80 },
        { id: 10, nombre: "Todo Rico", precio: 4500, stock: 80 },
      ])
    }
  }, [])

  return (
    <div>
      <h2 className="text-warning mb-4">Catálogo de Productos</h2>
      <div className="row g-4">
        {productos.map((prod) => (
          <div className="col-md-4 col-lg-3" key={prod.id}>
            <div className="card h-100 border-warning shadow-sm d-flex flex-column" style={{ background: "#1a1a1a" }}>
              <div className="d-flex justify-content-center align-items-center p-3" style={{ height: "180px" }}>
                {imagenesProductos[prod.nombre] ? (
                  <img src={imagenesProductos[prod.nombre]} alt={prod.nombre} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                ) : (
                  <span style={{ fontSize: "4rem" }}>🍺</span>
                )}
              </div>
              <div className="card-body d-flex flex-column text-center border-top border-secondary">
                <h5 className="text-warning fw-bold">{prod.nombre}</h5>
                <p className="text-white mb-1">${prod.precio.toLocaleString()}</p>
                <p className="text-muted small mb-3">Stock: {prod.stock}</p>
                <button 
                  className="btn btn-warning fw-bold mt-auto" 
                  onClick={() => alSeleccionarProducto(prod)}
                  disabled={prod.stock === 0}
                >
                  {prod.stock === 0 ? "Agotado" : "Seleccionar"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CatalogoCliente