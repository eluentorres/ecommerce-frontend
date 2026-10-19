import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginThunk } from '../../store/authSlice'
import FormInput from '../../components/FormInput/FormInput'
import Button from '../../components/Button/Button'

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const [form, setForm] = useState({ email: '', password: '' })
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrores((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje('')

    const nuevosErrores = {}

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nuevosErrores.email = 'Introduce un correo válido'
    }

    if (!form.password) {
      nuevosErrores.password = 'Introduce tu contraseña'
    }

    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length) return

    try {
      const resultado = await dispatch(loginThunk({
        email: form.email.trim(),
        password: form.password
      })).unwrap()

      const nombre = resultado.user?.name || 'usuario'
      const bienvenida = `¡Enhorabuena, ${nombre}! Ya puedes comprar en NØVA 2040.`

      setMensaje(bienvenida)

      navigate('/', {
        replace: true,
        state: { bienvenida }
      })
    } catch {
      // El error se muestra desde Redux.
    }
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
      {mensaje && <p role="status">{mensaje}</p>}

      <p>
        ¿Todavía no tienes cuenta?{' '}
        <Link to="/register">Regístrate aquí</Link>
      </p>
    </section>
  )
}

export default LoginPage
