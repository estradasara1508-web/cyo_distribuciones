import { useState } from "react"
import FormularioLogin from "./FormularioLogin"
import FormularioRegistro from "./FormularioRegistro"

function LoginModal({ mostrar, cerrar, onLogin }) {
  const [esRegistro, setEsRegistro] = useState(false)

  if (!mostrar) return null

  return (
    <div 
      className="modal d-block" 
      style={{ backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(5px)", zIndex: 1050 }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 shadow" style={{ background: "#151515", color: "white", border: "1px solid #d4af37" }}>
          
          <div className="modal-header border-0 pb-0">
            <div>
              <p style={{ color: "#d4af37", fontSize: "0.8rem", letterSpacing: "1px", fontWeight: "bold", marginBottom: "5px" }}>
                {esRegistro ? "ÚNETE A NOSOTROS" : "Login"}
              </p>
              <h3 className="modal-title fw-bold">
                {esRegistro ? "Crear Cuenta" : "Bienvenido"}
              </h3>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={cerrar}></button>
          </div>

          <div className="modal-body px-4 pb-4 pt-3">
            
            {/* Renderizado Condicional: Si esRegistro es true, muestra Registro. Si no, Login. */}
            {esRegistro ? (
              <FormularioRegistro 
                alRegistrarseExitosamente={() => setEsRegistro(false)} 
              />
            ) : (
              <FormularioLogin 
                onLogin={onLogin} 
                onLoginExitoso={cerrar} 
              />
            )}

            {/* Enlace para cambiar entre Login y Registro */}
            <div className="text-center mt-4 border-top pt-3" style={{ borderColor: "#333" }}>
              <span style={{ fontSize: "0.9rem", color: "#888" }}>
                {esRegistro ? "¿Ya tienes cuenta? " : "¿No tienes cuenta? "}
              </span>
              <button 
                type="button"
                className="btn btn-link p-0 text-decoration-none"
                style={{ color: "#d4af37", fontSize: "0.9rem", fontWeight: "bold" }}
                onClick={() => setEsRegistro(!esRegistro)}
              >
                {esRegistro ? "Inicia sesión aquí" : "Regístrate aquí"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal