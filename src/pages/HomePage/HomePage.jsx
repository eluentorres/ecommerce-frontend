import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import ProductGrid from '../../components/ProductGrid/ProductGrid'

function HomePage() {
  const location = useLocation()
  const { data: productos, loading, error } = useProducts()

  const productosDestacados = productos.slice(0, 4)

  return (
    <div className="home-page">
      {location.state?.bienvenida && (
        <p role="status" style={{
          padding: '18px',
          textAlign: 'center',
          backgroundColor: '#17251c',
          color: '#ffffff',
          fontWeight: 'bold'
        }}>
          {location.state.bienvenida}
        </p>
      )}

      <section className="hero">
        <p className="hero-label">
          NØVA / COLLECTION 001
        </p>

        <h1>
          THE FUTURE
          <br />
          IS NOW.
        </h1>

        <p>
          Moda sin límites. Diseño urbano, actitud rebelde
          y una nueva forma de vestir el futuro.
        </p>

        <Link to="/products" className="btn-primary">
          EXPLORAR COLECCIÓN →
        </Link>
      </section>

      <section className="featured-products">
        <p className="section-label">
          NØVA / SELECTED PIECES
        </p>

        <h2>PIEZAS DESTACADAS</h2>

        {loading && <p>Cargando productos destacados...</p>}

        {error && <p role="alert">{error}</p>}

        {!loading && !error && (
          <ProductGrid products={productosDestacados} />
        )}
      </section>

    </div>
  )
}

export default HomePage