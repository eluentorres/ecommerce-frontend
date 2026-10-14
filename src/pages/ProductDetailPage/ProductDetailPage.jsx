import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useProduct } from '../../hooks/useProduct'
import { useReviews } from '../../hooks/useReviews'
import ReviewList from '../../components/ReviewList/ReviewList'
import { addToCart } from '../../store/cartSlice'
import { fetchWishlist, toggleWishlist } from '../../store/wishlistSlice'

function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const token = useSelector((state) => state.auth.token)
  const cartLoading = useSelector((state) => state.cart.loading)
  const wishlistLoading = useSelector((state) => state.wishlist.loading)
  const productIds = useSelector((state) => state.wishlist.productIds)

  const {
    data: producto,
    loading,
    error
  } = useProduct(id)

  const {
    data: reviews,
    loading: reviewsLoading,
    error: reviewsError
  } = useReviews(id)

  const [cantidad, setCantidad] = useState(1)
  const [mensaje, setMensaje] = useState('')
  const [errorAccion, setErrorAccion] = useState('')

  const esFavorito = productIds.includes(id)

  useEffect(() => {
    if (token) {
      dispatch(fetchWishlist())
    }
  }, [dispatch, token])

  const handleAddToCart = async () => {
    if (!token) {
      navigate('/login')
      return
    }

    setMensaje('')
    setErrorAccion('')

    try {
      await dispatch(addToCart({
        productId: id,
        quantity: cantidad
      })).unwrap()

      setMensaje('¡Producto añadido al carrito!')
    } catch (error) {
      setErrorAccion(
        typeof error === 'string' ? error : 'No se pudo añadir al carrito'
      )
    }
  }

  const handleWishlist = async () => {
    if (!token) {
      navigate('/login')
      return
    }

    setMensaje('')
    setErrorAccion('')

    try {
      await dispatch(toggleWishlist(id)).unwrap()

      setMensaje(
        esFavorito
          ? 'Producto eliminado de favoritos'
          : '¡Producto guardado en favoritos!'
      )
    } catch (error) {
      setErrorAccion(
        typeof error === 'string' ? error : 'No se pudieron actualizar los favoritos'
      )
    }
  }

  if (loading) {
    return (
      <section className="product-detail">
        <p>Cargando producto...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="product-detail">
        <p role="alert">{error}</p>
        <Link to="/products">Volver al catálogo</Link>
      </section>
    )
  }

  if (!producto) {
    return (
      <section className="product-detail">
        <h1>Producto no encontrado</h1>
        <Link to="/products">Volver al catálogo</Link>
      </section>
    )
  }

  const aumentarCantidad = () => {
    if (cantidad < producto.stock) {
      setCantidad((anterior) => anterior + 1)
    }
  }

  const disminuirCantidad = () => {
    if (cantidad > 1) {
      setCantidad((anterior) => anterior - 1)
    }
  }

  return (
    <section className="product-detail">

      <Link to="/products">
        ← Volver al catálogo
      </Link>

      <div className="product-detail-content">

        {producto.imageUrl ? (
          <img
            src={producto.imageUrl}
            alt={producto.name}
            className="product-detail-image"
          />
        ) : (
          <div className="product-detail-image">
            Imagen no disponible
          </div>
        )}

        <div className="product-detail-info">

          <h1>{producto.name}</h1>

          <p>{producto.description}</p>

          <h2>
            {Number(producto.price).toFixed(2)} €
          </h2>

          <p>
            Disponibles: {producto.stock} unidades
          </p>

          <div className="quantity-selector">

            <button
              type="button"
              onClick={disminuirCantidad}
              disabled={cantidad <= 1}
            >
              −
            </button>

            <span>{cantidad}</span>

            <button
              type="button"
              onClick={aumentarCantidad}
              disabled={cantidad >= producto.stock}
            >
              +
            </button>

          </div>

          <button
            type="button"
            className="btn-primary"
            disabled={producto.stock === 0 || cartLoading}
            onClick={handleAddToCart}
          >
            {cartLoading ? 'AÑADIENDO...' : 'AÑADIR AL CARRITO 🛒'}
          </button>

          <button
            type="button"
            disabled={wishlistLoading}
            onClick={handleWishlist}
            style={{ marginTop: '12px' }}
          >
            {esFavorito ? '♥ QUITAR DE FAVORITOS' : '♡ AÑADIR A FAVORITOS'}
          </button>

          {mensaje && <p role="status">{mensaje}</p>}
          {errorAccion && <p role="alert">{errorAccion}</p>}

          <p>
            <Link to="/cart">VER MI CARRITO →</Link>
          </p>

          <p>
            <Link to="/wishlist">VER MIS FAVORITOS →</Link>
          </p>

        </div>
      </div>

      {/* RESEÑAS DEL PRODUCTO */}

      {reviewsLoading && (
        <p>Cargando opiniones...</p>
      )}

      {reviewsError && (
        <p role="alert">{reviewsError}</p>
      )}

      {!reviewsLoading && !reviewsError && (
        <ReviewList reviews={reviews} />
      )}

    </section>
  )
}

export default ProductDetailPage
