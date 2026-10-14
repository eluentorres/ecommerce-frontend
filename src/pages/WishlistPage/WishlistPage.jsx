import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchWishlist, toggleWishlist } from '../../store/wishlistSlice'
import api from '../../api/axios'

function WishlistPage() {
  const dispatch = useDispatch()
  const { productIds, loading, error } = useSelector((state) => state.wishlist)
  const [products, setProducts] = useState({})

  useEffect(() => {
    dispatch(fetchWishlist())
  }, [dispatch])

  useEffect(() => {
    Promise.all(
      productIds.map((id) =>
        api.get(`/api/products/${id}`)
          .then((response) => [id, response.data.data])
          .catch(() => [id, null])
      )
    ).then((entries) => {
      setProducts(Object.fromEntries(entries))
    })
  }, [productIds])

  return (
    <section className="products-page">
      <p className="section-label">NØVA / FAVORITES</p>
      <h1>MIS FAVORITOS</h1>

      {loading && <p>Cargando favoritos...</p>}
      {error && <p role="alert">{error}</p>}

      {productIds.length === 0 ? (
        <div>
          <p>Todavía no tienes favoritos.</p>
          <Link to="/products">DESCUBRIR COLECCIÓN →</Link>
        </div>
      ) : (
        productIds.map((id) => {
          const product = products[id]

          return (
            <article key={id} className="product-card-info">
              <h3>{product?.name || 'Producto NØVA'}</h3>
              {product && <p>{Number(product.price).toFixed(2)} €</p>}
              <Link to={`/products/${id}`}>VER PRODUCTO →</Link>
              {' '}
              <button
                type="button"
                disabled={loading}
                onClick={() => dispatch(toggleWishlist(id))}
              >
                QUITAR FAVORITO
              </button>
            </article>
          )
        })
      )}
    </section>
  )
}

export default WishlistPage
