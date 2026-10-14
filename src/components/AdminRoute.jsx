import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function AdminRoute() {
  const { user, initialized } = useSelector((state) => state.auth)

  if (!initialized) return <p>Comprobando sesión...</p>
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'ADMIN') return <Navigate to="/" replace />

  return <Outlet />
}

export default AdminRoute
