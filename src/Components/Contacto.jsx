import { useState } from "react"
import Swal from "sweetalert2"
import "./Contacto.css" // 👈 No olvides importar el CSS

function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  })

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const enviar = (e) => {
    e.preventDefault()
    Swal.fire({
      icon: "success",
      title: "¡Mensaje enviado!",
      text: "Pronto nos pondremos en contacto contigo.",
      confirmButtonColor: "#d4af37",
      background: "#1a1a1a",
      color: "#ffffff"
    })
    setForm({ nombre: "", correo: "", mensaje: "" })
  }

  return (
    <section className="py-5" id="contacto">
      <div className="container py-4">
        
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5" style={{ color: "white" }}>Contáctanos</h2>
          <div style={{ width: "60px", height: "4px", background: "var(--gold)", margin: "10px auto" }}></div>
        </div>

        <div className="row g-4 justify-content-center align-items-stretch">
          
          {/* Columna Izquierda: Información */}
          <div className="col-lg-4 col-md-5">
            <div className="h-100 p-5 rounded-4 d-flex flex-column justify-content-center info-contacto">
              <h3 className="fw-bold mb-4 text-white">Ponte en contacto</h3>
              
              <div className="d-flex align-items-center mb-4 gap-3">
                <div className="icono-contacto"><i className="bi bi-geo-alt-fill"></i></div>
                <span className="text-white">Calle 68 sur # 77N - 13, Bosa San Pablo, Bogotá D.C.</span>
              </div>

              <div className="d-flex align-items-center mb-4 gap-3">
                <div className="icono-contacto"><i className="bi bi-envelope-fill"></i></div>
                <span className="text-white">cyodistribuciones@gmail.com</span>
              </div>

              <div className="d-flex align-items-center mb-4 gap-3">
                <div className="icono-contacto"><i className="bi bi-telephone-fill"></i></div>
                <span className="text-white"> +57 310 569 7137</span>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="icono-contacto"><i className="bi bi-instagram"></i></div>
                <span className="text-white">@cyo_distribuciones</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario */}
          <div className="col-lg-6 col-md-7">
            <form onSubmit={enviar} className="p-5 rounded-4 h-100 d-flex flex-column justify-content-center form-contacto">
              <div className="mb-4">
                <input type="text" name="nombre" className="form-control form-control-lg text-white" placeholder="Tu Nombre" value={form.nombre} onChange={cambiar} required />
              </div>

              <div className="mb-4">
                <input type="email" name="correo" className="form-control form-control-lg text-white" placeholder="Tu Correo Electrónico" value={form.correo} onChange={cambiar} required />
              </div>

              <div className="mb-4 flex-grow-1">
                <textarea name="mensaje" className="form-control form-control-lg text-white h-100" placeholder="Tu Mensaje" value={form.mensaje} onChange={cambiar} required style={{ minHeight: "150px" }}></textarea>
              </div>

              <button type="submit" className="btn btn-lg fw-bold align-self-start px-5">
                Enviar Mensaje
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contacto