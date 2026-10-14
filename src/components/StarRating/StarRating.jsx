function StarRating({ rating = 0 }) {
  const puntuacion = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)))

  return (
    <div
      className="star-rating"
      aria-label={`Valoración: ${puntuacion} de 5 estrellas`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          style={{
            color: index < puntuacion ? '#c6ff00' : '#777'
          }}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default StarRating