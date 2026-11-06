import CategoriaProductos from "../Components/CategoriaProductos"
import aguardienteAmarillo from "../assets/Aguardiente amarillo.jpg"
import aguardienteAntioqueno from "../assets/Aguardiente antioqueño.jpg"
import aguardienteNectar from "../assets/Aguardiente nectar.jpg"
import bigCola from "../assets/Big cola.jpg"
import aguila from "../assets/Cerveza Aguila.jpg"
import costena from "../assets/Cerveza costeña.jpg"
import poker from "../assets/Cerveza Poker.jpg"
import cifrut from "../assets/Cifrut.jpg"
import clubColombia from "../assets/Club colombia.jpg"
import fourLoko from "../assets/Four loko.jpg"
import gatorade from "../assets/Gatorade.jpg"
import lucky from "../assets/Lucky.jpg"
import rothmans from "../assets/Rothmans.jpg"
import todoRico from "../assets/Todo Rico.jpg"

const categoriasIniciales = [
  {
    id: "cervezas",
    titulo: "🍺 Cervezas Colombianas",
    subtitulo: "Nacionales",
    productos: [
      { id: 1, nombre: "Cerveza Poker", precio: 3500, stock: 100, imagen: poker },
      { id: 2, nombre: "Cerveza Águila", precio: 2800, stock: 80, imagen: aguila },
      { id: 3, nombre: "Club Colombia", precio: 4000, stock: 50, imagen: clubColombia },
      { id: 4, nombre: "Cerveza Costeña", precio: 3000, stock: 60, imagen: costena },
    ],
  },
  {
    id: "licores",
    titulo: "🥃 Aguardientes y Licores",
    subtitulo: "Tradición Colombiana",
    productos: [
      { id: 5, nombre: "Aguardiente Amarillo", precio: 56000, stock: 20, imagen: aguardienteAmarillo },
      { id: 6, nombre: "Aguardiente Antioqueño", precio: 52000, stock: 15, imagen: aguardienteAntioqueno },
      { id: 7, nombre: "Aguardiente Néctar", precio: 48000, stock: 25, imagen: aguardienteNectar },
    ],
  },
  {
    id: "cigarrillos",
    titulo: "🚬 Cigarrillos",
    subtitulo: "Producto Nacional",
    productos: [
      { id: 8, nombre: "Cigarrillos Rothmans", precio: 8000, stock: 200, imagen: rothmans },
      { id: 9, nombre: "Cigarrillos Lucky Strike", precio: 9500, stock: 150, imagen: lucky },
    ],
  },
  {
    id: "bebidas",
    titulo: "🧃 Bebidas No Alcohólicas",
    subtitulo: "Refresca tu día",
    productos: [
      { id: 10, nombre: "Jugo Cifrut", precio: 5500, stock: 60, imagen: cifrut },
      { id: 11, nombre: "Gaseosa Big Cola", precio: 4500, stock: 80, imagen: bigCola },
      { id: 12, nombre: "Gatorade", precio: 3500, stock: 100, imagen: gatorade },
    ],
  },
  {
    id: "snacks",
    titulo: "🍟 Snacks y Papas",
    subtitulo: "Para acompañar",
    productos: [
      { id: 13, nombre: "Todo Rico", precio: 4500, stock: 80, imagen: todoRico },
    ],
  },
  // 👇 NUEVA CATEGORÍA: OTROS
  {
    id: "otros",
    titulo: "🍹 Otros Productos",
    subtitulo: "Bebidas Mixtas",
    productos: [
      { id: 14, nombre: "Four Loko", precio: 15000, stock: 40, imagen: fourLoko },
    ],
  },
]

function Productos() {
  return (
    <div style={{ paddingTop: "2rem" }} id="categorias">
      {categoriasIniciales.map((cat) => (
        <CategoriaProductos
          key={cat.id}
          titulo={cat.titulo}
          subtitulo={cat.subtitulo}
          productos={cat.productos}
        />
      ))}
    </div>
  )
}

export default Productos