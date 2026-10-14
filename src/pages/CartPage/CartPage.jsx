import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProducts } from '../../api/products'
import { fetchCart, removeFromCart, checkout } from '../../store/cartSlice'

function CartPage() {
  const dispatch = useDispatch()
  const { items, loading, error, lastOrder } = useSelector((state) => state.cart)
  const [products, setProducts] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(Array.isArray(data) ? data : data?.products || [])
      })
      .catch(() => setProducts([]))
  }, [])

  const findProduct = (id) =>
    products.find((product) => String(product.id) === String(id))

  const total = items.reduce((sum, item) => {
    const product = findProduct(item.productId)
    return sum + Number(product?.price || 0) * item.quantity
  }, 0)

  const handleCheckout = async () => {
    setMessage('')

    try {
      await dispatch(checkout()).unwrap()
      setMessage('¡Pedido realizado correctamente!')
    } catch {
      setMessage('No se pudo finalizar la compra.')
    }
  }

  return (
    <section className="products-page nova-cart">
      <p className="section-label">NØVA / SHOPPING</p>
      <h1>MI CARRITO</h1>

      {loading && <p>Procesando...</p>}
      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}

      {items.length === 0 ? (
        <div className="nova-cart-empty">
          <p>Tu carrito está vacío.</p>
          <Link to="/products" className="btn-primary">
            EXPLORAR COLECCIÓN →
          </Link>
        </div>
      ) : (
        <>
          <div className="nova-cart-items">
            {items.map((item) => {
              const product = findProduct(item.productId)

              return (
                <article key={item.productId} className="nova-cart-item">
                  <div className="nova-cart-image">
                    {product?.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                      />
                    ) : (
                      <span>NØVA</span>
                    )}
                  </div>

                  <div className="nova-cart-details">
                    <h3>{product?.name || 'Producto NØVA'}</h3>
                    <p>CANTIDAD: {item.quantity}</p>
                    {product && (
                      <p className="nova-cart-price">
                        {Number(product.price).toFixed(2)} € / unidad
                      </p>
                    )}
                    <button
                      type="button"
                      className="btn-secondary"
                      disabled={loading}
                      onClick={() => dispatch(removeFromCart(item.productId))}
                    >
                      ELIMINAR
                    </button>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="nova-cart-summary">
            <h2>TOTAL: {total.toFixed(2)} €</h2>
            <button
              type="button"
              className="btn-primary"
              disabled={loading}
              onClick={handleCheckout}
            >
              FINALIZAR COMPRA →
            </button>
          </div>
        </>
      )}

      {lastOrder && (
        <p>Último pedido confirmado: {lastOrder.id}</p>
      )}
    </section>
  )
}

export default CartPage
