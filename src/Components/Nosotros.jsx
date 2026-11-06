import "./Nosotros.css"

function Nosotros() {
  return (
    <section className="py-5" id="nosotros">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-md-6">
            <img
              src={nosotros}
              alt="Sobre nosotros"
              className="img-fluid rounded-4 shadow"
            />
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">Sobre Nosotros</h2>
            <p className="text-secondary">
              Somos una distribuidora apasionada por la cerveza artesanal.
              Llevamos más de <strong>10 años</strong> conectando a los
              mejores maestros cerveceros del país con bares, restaurantes y
              amantes de la buena cerveza.
            </p>
            <ul className="list-unstyled mt-4">
              <li className="mb-2">
                <i className="bi bi-check-circle-fill text-warning me-2"></i>
                Productos 100% artesanales
              </li>
              <li className="mb-2">
                <i className="bi bi-check-circle-fill text-warning me-2"></i>
                Envíos a todo el país
              </li>
              <li className="mb-2">
                <i className="bi bi-check-circle-fill text-warning me-2"></i>
                Precios para mayoristas y minoristas
              </li>
            </ul>
            <a href="#contacto" className="btn btn-dark mt-3">
              Contáctanos
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Nosotros