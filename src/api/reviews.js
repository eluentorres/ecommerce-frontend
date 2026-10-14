import api from './axios'

export const getReviews = async (productId) => {
  const response = await api.get(
    `/api/products/${productId}/reviews`
  )

  return response.data.data
}