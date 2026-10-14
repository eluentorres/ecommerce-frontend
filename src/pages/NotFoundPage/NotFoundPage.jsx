import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <h1>404 😕</h1>

      <h2>Página no encontrada</h2>

      <p>
        Lo sentimos, la página que buscas no existe.
      </p>

      <Link to="/" className="btn-primary">
        Volver al inicio
      </Link>
    </section>
  )
}

export default NotFoundPage