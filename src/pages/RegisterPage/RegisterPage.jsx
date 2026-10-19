import { useState } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../../api/auth'
import FormInput from '../../components/FormInput/FormInput'
import Button from '../../components/Button/Button'

function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [errores, setErrores] = useState({})
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [registrado, setRegistrado] = useState(false)

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    const nuevosErrores = {}

    if (!form.name.trim()) {
      nuevosErrores.name = 'Introduce tu nombre'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nuevosErrores.email = 'Introduce un email válido'
    }

    if (form.password.length < 8) {
      nuevosErrores.password = 'La contraseña debe tener al menos 8 caracteres'
    }

    if (form.password !== form.confirmPassword) {
      nuevosErrores.confirmPassword = 'Las contraseñas no coinciden'
    }

    setErrores(nuevosErrores)
    setMensaje('')

    if (Object.keys(nuevosErrores).length > 0) {
      return
    }

    setLoading(true)

    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password
      })

      setRegistrado(true)
      setMensaje('¡Cuenta creada correctamente! Ya puedes iniciar sesión.')

      setForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    } catch (error) {
      setRegistrado(false)
      setMensaje(
        error.response?.data?.error?.message ||
        'No se pudo completar el registro.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="products-page">
      <p className="section-label">NØVA / ACCOUNT</p>

      <h1>CREAR CUENTA</h1>

      <p>Únete a la nueva generación NØVA.</p>

      <form onSubmit={handleSubmit} noValidate>
        <FormInput
          label="Nombre"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errores.name}
          autoFocus
          placeholder="Tu nombre"
        />

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
          label="Contraseña (mínimo 8 caracteres)"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errores.password}
          placeholder="Mínimo 8 caracteres"
        />

        <FormInput
          label="Confirmar contraseña"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errores.confirmPassword}
          placeholder="Repite tu contraseña"
        />

        <Button type="submit" disabled={loading}>
          {loading ? 'CREANDO CUENTA...' : 'REGISTRARME'}
        </Button>
      </form>

      {mensaje && (
        <p role="status">{mensaje}</p>
      )}

      {registrado && (
        <Link to="/login">IR A INICIAR SESIÓN →</Link>
      )}

      <p>
        ¿Ya tienes cuenta?{' '}
        <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </section>
  )
}

export default RegisterPage