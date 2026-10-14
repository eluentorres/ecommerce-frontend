import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../../api/axios'

const emptyForm = {
  name: '',
  description: '',
  price: '',
  stock: '',
  imageUrl: ''
}

function AdminPage() {
  const user = useSelector((state) => state.auth.user)
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  const loadProducts = async () => {
    try {
      const response = await api.get('/api/products')
      setProducts(response.data.data || [])
    } catch {
      setError('No se pudieron cargar los productos')
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  if (user?.role !== 'ADMIN') {
    return <h2>Acceso restringido a administradores</h2>
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')

    const product = {
      name: form.name.trim(),
      description: form.description,
      price: Number(form.price),
      stock: Number(form.stock),
      imageUrl: form.imageUrl
    }

    if (!product.name || form.price === '' || form.stock === '' ||
        !Number.isFinite(product.price) || product.price < 0 ||
        !Number.isInteger(product.stock) || product.stock < 0) {
      setError('Revisa el nombre, precio y stock')
      return
    }

    setSaving(true)

    try {
      if (editingId) {
        await api.put(`/api/products/${editingId}`, product)
        setMessage('Producto actualizado')
      } else {
        await api.post('/api/products', product)
        setMessage('Producto creado')
      }

      resetForm()
      await loadProducts()
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Error al guardar producto')
    } finally {
      setSaving(false)
    }
  }

  const editProduct = (product) => {
    setEditingId(product.id)
    setForm({
      name: product.name || '',
      description: product.description || '',
      price: String(product.price),
      stock: String(product.stock),
      imageUrl: product.imageUrl || ''
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const deleteProduct = async (product) => {
    if (!window.confirm(`¿Eliminar "${product.name}" definitivamente?`)) return

    setError('')
    setMessage('')

    try {
      await api.delete(`/api/products/${product.id}`)
      setMessage('Producto eliminado')
      await loadProducts()
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Error al eliminar producto')
    }
  }

  return (
    <section className="products-page">
      <p className="section-label">NOVA / ADMIN</p>
      <h1>ADMINISTRAR PRODUCTOS</h1>

      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, maxWidth: 550 }}>
        <h2>{editingId ? 'Editar producto' : 'Crear producto'}</h2>

        <input name="name" placeholder="Nombre" value={form.name}
          onChange={handleChange} required />

        <textarea name="description" placeholder="Descripción"
          value={form.description} onChange={handleChange} />

        <input name="price" type="number" min="0" step="0.01"
          placeholder="Precio" value={form.price}
          onChange={handleChange} required />

        <input name="stock" type="number" min="0" step="1"
          placeholder="Stock" value={form.stock}
          onChange={handleChange} required />

        <input name="imageUrl" placeholder="/products/imagen.png"
          value={form.imageUrl} onChange={handleChange} />

        <button type="submit" disabled={saving}>
          {saving ? 'Guardando...' : editingId ? 'Guardar cambios' : 'Crear producto'}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm}>Cancelar edición</button>
        )}
      </form>

      <h2 style={{ marginTop: 40 }}>Productos ({products.length})</h2>

      <div style={{ display: 'grid', gap: 16 }}>
        {products.map((product) => (
          <article key={product.id} style={{
            border: '1px solid #555',
            padding: 16,
            borderRadius: 8
          }}>
            <h3>{product.name}</h3>
            <p>{product.price} € — Stock: {product.stock}</p>

            <button type="button" onClick={() => editProduct(product)}>
              Editar
            </button>

            {' '}

            <button type="button" onClick={() => deleteProduct(product)}>
              Eliminar
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AdminPage
