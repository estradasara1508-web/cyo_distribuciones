import coronaImg from "../assets/Cerveza corona.jpg" 
import aguardienteamarillo from "../assets/Aguardiente amarillo.jpg"
import "./Hero.css"

function Hero() {
  return (
    <div id="heroCarousel" className="carousel slide hero-carousel" data-bs-ride="carousel">
      
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
      </div>

      <div className="carousel-inner">
        {/* Slide 1: Águila */}
        <div className="carousel-item active">
          <div className="hero-slide-container">
            <div className="hero-left">
              <img src={coronaImg} alt="Cerveza" className="hero-bottle" />
            </div>
            <div className="hero-right">
              <h5 className="hero-subtitle">VIVIR ES UNA EXPERIENCIA SENSORIAL</h5>
              <h1 className="hero-title">ESTA ES LA VIDA</h1>
              <p className="hero-text">
                 C.Y.O Distribuciones te trae lo mejor de la cerveza colombiana, 
                el licor y los snacks para tus mejores momentos.
              </p>
              <a href="#categorias" className="btn btn-outline-warning mt-4">VER CATÁLOGO</a>
            </div>
          </div>
        </div>

        {/* Slide 2: Aguardiente Amarillo */}
        <div className="carousel-item">
          <div className="hero-slide-container">
            <div className="hero-left">
              <img src={aguardienteamarillo} alt="Licor" className="hero-bottle" />
            </div>
            <div className="hero-right">
              <h5 className="hero-subtitle">TRADICIÓN Y CALIDAD</h5>
              <h1 className="hero-title">AGUARDIENTES</h1>
              <p className="hero-text">
                Descubre nuestra selección de licores nacionales e importados. 
                El sabor que estabas buscando, directo a tu puerta.
              </p>
              <a href="#categorias" className="btn btn-outline-warning mt-4">VER LICORES</a>
            </div>
          </div>
        </div>
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
      </button>
    </div>
  )
}

export default Hero