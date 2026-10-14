import { useState, useEffect } from 'react'
import { getProductById } from '../api/products'

export function useProduct(id) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    const fetchProduct = async () => {
      setLoading(true)
      setError(null)
      setData(null)

      try {
        const producto = await getProductById(id)

        if (active) {
          setData(producto)
        }
      } catch (err) {
        if (active) {
          setError('No se pudo cargar el producto')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    if (id) {
      fetchProduct()
    } else {
      setLoading(false)
    }

    return () => {
      active = false
    }
  }, [id])

  return { data, loading, error }
}