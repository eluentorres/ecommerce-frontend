import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { loginThunk } from '../../store/authSlice'
import FormInput from '../../components/FormInput/FormInput'
import Button from '../../components/Button/Button'

function LoginPage() {
  const dispatch = useDispatch()
  const { token, loading, error } = useSelector((state) => state.auth)

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [errores, setErrores] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((anterior) => ({
      ...anterior,
      [name]: value
    }))

    setErrores((anterior) => ({
      ...anterior,
      [name]: ''
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const nuevosErrores = {}

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nuevosErrores.email = 'Introduce un email válido'
    }

    if (!form.password) {
      nuevosErrores.password = 'Introduce tu contraseña'
    }

    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) return

    dispatch(loginThunk({
      email: form.email.trim(),
      password: form.password
    }))
  }

  if (token) {
    return <Navigate to="/profile" replace />
  }

  return (
    <section className="products-page">
      <p className="section-label">NØVA / ACCOUNT</p>

      <h1>INICIAR SESIÓN</h1>

      <p>Accede a tu cuenta NØVA.</p>

      <form onSubmit={handleSubmit} noValidate>
        <FormInput
          label="Correo electrónico"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errores.email}
          autoFocus
          placeholder="tu@email.com"
        />

        <FormInput
          label="Contraseña"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errores.password}
          placeholder="Tu contraseña"
        />

        <Button type="submit" disabled={loading}>
          {loading ? 'ENTRANDO...' : 'INICIAR SESIÓN'}
        </Button>
      </form>

      {error && <p role="alert">{error}</p>}

      <p>
        ¿Todavía no tienes cuenta?{' '}
        <Link to="/register">Regístrate aquí</Link>
      </p>
    </section>
  )
}

export default LoginPage
