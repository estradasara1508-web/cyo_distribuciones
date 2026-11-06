function Footer() {
  return (
    <footer className="bg-dark py-4 mt-5" style={{ borderTop: "1px solid var(--gold, #d4af37)" }}>
      <div className="container">
        <div className="row gy-4 text-center text-md-start">
          
          <div className="col-md-4">
            <h4 className="fw-bold" style={{ color: "var(--gold, #d4af37)" }}>
              🍺 C.Y.O DISTRIBUCIONES
            </h4>
            <p className="text-white-50">
              Tu distribuidora de cervezas, licores y snacks de confianza.
            </p>
          </div>

          <div className="col-md-4">
            <h5 className="text-white mb-3">Enlaces de interés</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#inicio" className="text-white-50 text-decoration-none">Inicio</a>
              </li>
              <li className="mb-2">
                <a href="#categorias" className="text-white-50 text-decoration-none">Catálogo</a>
              </li>
              <li className="mb-2">
                <a href="#nosotros" className="text-white-50 text-decoration-none">Nosotros</a>
              </li>
              <li className="mb-2">
                <a href="#contacto" className="text-white-50 text-decoration-none">Contacto</a>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5 className="text-white mb-3">Contáctanos</h5>
            <p className="text-white-50 mb-1">Colombia</p>
            <p className="text-white-50 mb-1">contacto@distribuidoracervecera.com</p>
            <p className="text-white-50 mb-1">+57 300 000 0000</p>
          </div>
        </div>

        <hr className="border-secondary mt-4" />

        <div className="text-center">
          <p className="mb-0 text-white-50">
            © {new Date().getFullYear()} C.Y.O Distribuciones. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer