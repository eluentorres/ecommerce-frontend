import { useState, useEffect } from 'react'
import { getReviews } from '../api/reviews'

export function useReviews(productId) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    const fetchReviews = async () => {
      setLoading(true)
      setError(null)
      setData([])

      try {
        const reviews = await getReviews(productId)

        if (active) {
          setData(reviews)
        }
      } catch (err) {
        if (active) {
          setError('No se pudieron cargar las reseñas')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    if (productId) {
      fetchReviews()
    } else {
      setLoading(false)
    }

    return () => {
      active = false
    }
  }, [productId])

  return { data, loading, error }
}