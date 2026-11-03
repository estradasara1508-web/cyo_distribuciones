import { useState } from "react"
import Swal from "sweetalert2"
// import contacto from "../assets/contacto.jpg" // 👈 Descomenta si tienes la imagen

function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  })

  const cambiar = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

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
    <section className="py-5" id="contacto" style={{ background: "var(--bg-secondary)" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ color: "var(--gold)" }}>Contáctanos</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            ¿Necesitas una cotización o tienes alguna pregunta? Escríbenos.
          </p>
        </div>

        <div className="row align-items-center g-4 justify-content-center">
          <div className="col-md-8 col-lg-6">
            <form onSubmit={enviar} className="p-4 rounded-4" style={{ background: "var(--card-bg)", border: "1px solid var(--gold)" }}>
              <div className="mb-3">
                <label className="form-label" style={{ color: "var(--text-secondary)" }}>Nombre completo</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="Ingresa tu nombre"
                  value={form.nombre}
                  onChange={cambiar}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" style={{ color: "var(--text-secondary)" }}>Correo electrónico</label>
                <input
                  type="email"
                  name="correo"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="Ingresa tu correo"
                  value={form.correo}
                  onChange={cambiar}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" style={{ color: "var(--text-secondary)" }}>Mensaje</label>
                <textarea
                  name="mensaje"
                  className="form-control bg-dark text-white border-secondary"
                  rows="4"
                  placeholder="Ingresa tu mensaje"
                  value={form.mensaje}
                  onChange={cambiar}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn w-100 fw-bold" style={{ backgroundColor: "var(--gold)", color: "var(--black)" }}>
                Enviar mensaje
              </button>
            </form>
          </div>

          {/* 👇 Si tienes la imagen, descomenta este bloque y el import de arriba */}
          {/* 
          <div className="col-md-6 col-lg-5">
            <img
              src={contacto}
              alt="Contacto"
              className="img-fluid rounded-4 shadow"
              style={{ border: "1px solid var(--gold)" }}
            />
          </div> 
          */}
        </div>
      </div>
    </section>
  )
}

export default Contacto