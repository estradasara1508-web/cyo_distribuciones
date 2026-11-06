import { useState } from "react"

const preguntas = [
  { q: "¿Realizan envíos a mi ubicación?", a: "¡Sí! Hacemos envíos a todo el país. Consulta con tu asesor." },
  { q: "¿Qué hago si mi pedido llega dañado?", a: "Contáctanos de inmediato. Te repondremos el producto sin costo." },
  { q: "¿Cuánto tiempo tarda en llegar mi pedido?", a: "Depende de tu ciudad. Generalmente entre 24 y 72 horas." },
  { q: "¿Cómo puedo realizar una compra en CYO en línea?", a: "Regístrate, ve al catálogo, selecciona tu producto y llena el formulario." }
]

function MascotaAsistente() {
  const [abierto, setAbierto] = useState(false)
  const [respuesta, setRespuesta] = useState(null)

  return (
    <div className="mascota-container">
      {/* Panel de chat */}
      <div className={`chat-panel ${abierto ? "visible" : ""}`}>
        <div className="chat-header">
          <div className="d-flex align-items-center gap-2">
            <span style={{ fontSize: "1.5rem" }}>🐕</span>
            <h5 className="m-0 text-warning fw-bold">¡Hola! Soy Princesa</h5>
          </div>
          <button className="btn-close btn-close-white" onClick={() => setAbierto(false)}></button>
        </div>

        <div className="chat-body">
          {preguntas.map((item, index) => (
            <div key={index} className="mb-3">
              <div 
                className="pregunta-btn" 
                onClick={() => setRespuesta(respuesta === index ? null : index)}
              >
                🐾 {item.q}
              </div>
              {respuesta === index && (
                <div className="respuesta-texto">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          Haz clic en una pregunta para ver la respuesta 🐾
        </div>
      </div>

      {/* Botón flotante */}
      <div className="mascota-btn-flotante" onClick={() => setAbierto(!abierto)}>
        🐕
      </div>
    </div>
  )
}

export default MascotaAsistente