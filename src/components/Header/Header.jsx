import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logoutThunk } from '../../store/authSlice'

function Header() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const [menuAbierto, setMenuAbierto] = useState(false)

  const cerrarMenu = () => setMenuAbierto(false)

  const cerrarSesion = () => {
    dispatch(logoutThunk())
    cerrarMenu()
  }

  return (
    <header className="header">
      <NavLink to="/" className="logo" onClick={cerrarMenu}>
        NØVA<span style={{ color: '#c6ff00' }}>.</span>
      </NavLink>

      <button
        type="button"
        className="menu-button"
        onClick={() => setMenuAbierto(!menuAbierto)}
        aria-expanded={menuAbierto}
        aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
      >
        {menuAbierto ? '✕' : '☰'}
      </button>

      <nav className={menuAbierto ? 'nav abierto' : 'nav'}>
        <NavLink to="/" end onClick={cerrarMenu}>
          Inicio
        </NavLink>

        <NavLink to="/products" onClick={cerrarMenu}>
          Colección
        </NavLink>

        {user ? (
          <>
            <NavLink to="/cart" onClick={cerrarMenu}>
              Carrito 🛒
            </NavLink>

            <NavLink to="/wishlist" onClick={cerrarMenu}>
              Favoritos ♡
            </NavLink>

            <NavLink to="/profile" onClick={cerrarMenu}>
              Mi perfil
            </NavLink>

            <button type="button" className="btn-logout" onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" onClick={cerrarMenu}>
              Iniciar sesión
            </NavLink>

            <NavLink to="/register" onClick={cerrarMenu}>
              Registrarse
            </NavLink>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header

