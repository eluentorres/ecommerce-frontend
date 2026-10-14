import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api/axios'
import { logout } from './authSlice'

const getError = (error) =>
  error.response?.data?.error?.message || error.message || 'Error en favoritos'

export const fetchWishlist = createAsyncThunk('wishlist/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/api/wishlist')
    return response.data.data
  } catch (error) {
    return rejectWithValue(getError(error))
  }
})

export const toggleWishlist = createAsyncThunk(
  'wishlist/toggle',
  async (productId, { getState, rejectWithValue }) => {
    try {
      const exists = getState().wishlist.productIds.includes(productId)
      const response = exists
        ? await api.delete(`/api/wishlist/${productId}`)
        : await api.post(`/api/wishlist/${productId}`)

      return response.data.data
    } catch (error) {
      return rejectWithValue(getError(error))
    }
  }
)

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    productIds: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.productIds = []
      state.error = null
    })

    for (const thunk of [fetchWishlist, toggleWishlist]) {
      builder.addCase(thunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      builder.addCase(thunk.fulfilled, (state, action) => {
        state.loading = false
        state.productIds = action.payload || []
      })
      builder.addCase(thunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error en favoritos'
      })
    }
  }
})

export default wishlistSlice.reducer
