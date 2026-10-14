import { useMemo, useState } from 'react'
import { useProducts } from '../../hooks/useProducts'
import ProductGrid from '../../components/ProductGrid/ProductGrid'

function ProductsPage() {
  const [busqueda, setBusqueda] = useState('')
  const [orden, setOrden] = useState('default')

  const { data: productos, loading, error } = useProducts()

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase()

    const resultado = (productos ?? []).filter((producto) =>
      producto.name.toLowerCase().includes(texto)
    )

    return resultado.slice().sort((a, b) => {
      if (orden === 'precio-asc') {
        return Number(a.price) - Number(b.price)
      }

      if (orden === 'precio-desc') {
        return Number(b.price) - Number(a.price)
      }

      if (orden === 'nombre') {
        return a.name.localeCompare(b.name)
      }

      return 0
    })
  }, [productos, busqueda, orden])

  return (
    <section className="products-page">
      <p className="section-label">
        NØVA / COLLECTION 001
      </p>

      <h1>NUESTRA COLECCIÓN</h1>

      <p>Explora todos nuestros productos.</p>

      <input
        type="search"
        placeholder="Buscar productos..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="search-input"
        aria-label="Buscar productos"
      />

      <select
        value={orden}
        onChange={(e) => setOrden(e.target.value)}
        className="search-input"
        aria-label="Ordenar productos"
      >
        <option value="default">Orden original</option>
        <option value="precio-asc">Precio: menor a mayor</option>
        <option value="precio-desc">Precio: mayor a menor</option>
        <option value="nombre">Nombre: A-Z</option>
      </select>

      {loading && <p>Cargando productos...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && !error && (
        <>
          <p>{productosFiltrados.length} productos encontrados</p>

          <ProductGrid products={productosFiltrados} />
        </>
      )}
    </section>
  )
}

export default ProductsPage
