
import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  const imageUrl = product.imageUrl || '/products/placeholder.png'

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-link">
        <img
          src={imageUrl}
          alt={product.name}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = '/products/placeholder.png'
          }}
        />
      </Link>

      <div className="product-card-info">
        <h3>{product.name}</h3>

        <p>{Number(product.price).toFixed(2)} €</p>

        <Link to={`/products/${product.id}`} className="product-link">
          DESCUBRIR →
        </Link>
      </div>
    </article>
  )
}

export default ProductCard
