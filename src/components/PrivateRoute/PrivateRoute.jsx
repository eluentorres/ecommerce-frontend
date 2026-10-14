import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function PrivateRoute() {
  const { user, initialized } = useSelector((state) => state.auth)
  const location = useLocation()

  if (!initialized) {
    return <p>Comprobando sesión...</p>
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default PrivateRoute
