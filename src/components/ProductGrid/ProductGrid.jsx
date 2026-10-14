import ProductCard from '../ProductCard/ProductCard'

function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <p className="empty-products">
        No hemos encontrado productos.
      </p>
    )
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  )
}

export default ProductGrid