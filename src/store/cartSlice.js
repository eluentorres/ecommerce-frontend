import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit'
import api from '../api/axios'
import { logout } from './authSlice'

const getError = (error) =>
  error.response?.data?.error?.message || error.message || 'Error en el carrito'

export const fetchCart = createAsyncThunk('cart/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/api/cart')
    return response.data.data
  } catch (error) {
    return rejectWithValue(getError(error))
  }
})

export const addToCart = createAsyncThunk('cart/add', async ({ productId, quantity = 1 }, { rejectWithValue }) => {
  try {
    const response = await api.post('/api/cart/items', { productId, quantity })
    return response.data.data
  } catch (error) {
    return rejectWithValue(getError(error))
  }
})

export const removeFromCart = createAsyncThunk('cart/remove', async (productId, { dispatch, rejectWithValue }) => {
  try {
    await api.delete(`/api/cart/items/${productId}`)
    await dispatch(fetchCart()).unwrap()
    return productId
  } catch (error) {
    return rejectWithValue(getError(error))
  }
})

export const checkout = createAsyncThunk('cart/checkout', async (_, { dispatch, rejectWithValue }) => {
  try {
    const response = await api.post('/api/cart/checkout')
    await dispatch(fetchCart()).unwrap()
    return response.data.data
  } catch (error) {
    return rejectWithValue(getError(error))
  }
})

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
    lastOrder: null
  },
  reducers: {
    clearCart: (state) => {
      state.items = []
      state.lastOrder = null
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload?.items || []
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload?.items || []
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.lastOrder = action.payload
        state.items = []
      })
      .addCase(logout, (state) => {
        state.items = []
        state.lastOrder = null
        state.error = null
      })

    for (const thunk of [fetchCart, addToCart, removeFromCart, checkout]) {
      builder.addCase(thunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      builder.addCase(thunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error en el carrito'
      })
    }

    builder.addMatcher(
      isAnyOf(fetchCart.fulfilled, addToCart.fulfilled, removeFromCart.fulfilled, checkout.fulfilled),
      (state) => { state.loading = false }
    )
  }
})

export const { clearCart } = cartSlice.actions
export default cartSlice.reducer


