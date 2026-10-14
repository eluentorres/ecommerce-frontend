import StarRating from '../StarRating/StarRating'

function ReviewList({ reviews = [] }) {
  return (
    <section className="reviews-section">
      <h2>OPINIONES DE CLIENTES</h2>

      {reviews.length === 0 ? (
        <p>Este producto todavía no tiene reseñas.</p>
      ) : (
        <div className="reviews-list">
          {reviews.map((review) => (
            <article className="review-card" key={review._id}>
              <StarRating rating={review.rating} />

              {review.comment && (
                <p>{review.comment}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default ReviewList