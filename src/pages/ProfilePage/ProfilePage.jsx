import { useDispatch, useSelector } from 'react-redux'
import { logoutThunk } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

function ProfilePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logoutThunk())
    navigate('/login', { replace: true })
  }

  return (
    <section className="products-page">
      <p className="section-label">NØVA / ACCOUNT</p>
      <h1>MI PERFIL</h1>

      <p>Bienvenido a tu espacio NØVA.</p>

      {user ? (
        <>
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </>
      ) : (
        <p>Sesión activa. Cargando información del usuario...</p>
      )}

      <button type="button" className="btn-logout" onClick={handleLogout}>
        CERRAR SESIÓN
      </button>
    </section>
  )
}

export default ProfilePage


