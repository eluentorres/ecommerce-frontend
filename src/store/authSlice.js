import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login, register } from '../api/auth'
import api from '../api/axios'

const getError = (error) =>
  error.response?.data?.error?.message ||
  error.response?.data?.message ||
  error.message ||
  'Ha ocurrido un error'

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await login(credentials)
      localStorage.removeItem('token')
      return data
    } catch (error) {
      return rejectWithValue(getError(error))
    }
  }
)

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (form, { rejectWithValue }) => {
    try {
      return await register(form)
    } catch (error) {
      return rejectWithValue(getError(error))
    }
  }
)

export const fetchMe = createAsyncThunk(
  'auth/fetchMe',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/auth/me')
      return response.data.data
    } catch (error) {
      return rejectWithValue(getError(error))
    }
  }
)

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      await api.post('/api/auth/logout')
    } finally {
      dispatch(logout())
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    loading: false,
    initialized: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token')
      state.token = null
      state.user = null
      state.initialized = true
      state.error = null
      state.loading = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false
        state.initialized = true
        state.user = action.payload.user
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al iniciar sesión'
      })
      .addCase(registerThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al registrarse'
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload
        state.initialized = true
      })
      .addCase(fetchMe.rejected, (state) => {
        state.user = null
        state.initialized = true
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
