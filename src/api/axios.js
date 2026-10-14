import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      !error.config?.url?.includes('/api/auth/me') &&
      !error.config?.url?.includes('/api/auth/login')
    ) {
      window.dispatchEvent(new Event('auth:expired'))
    }

    return Promise.reject(error)
  }
)

export default api
