import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMe, logout } from '../../store/authSlice'

function AuthSync() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    if (token) {
      dispatch(fetchMe())
    }
  }, [dispatch, token])

  useEffect(() => {
    const handleExpired = () => dispatch(logout())

    window.addEventListener('auth:expired', handleExpired)

    return () => {
      window.removeEventListener('auth:expired', handleExpired)
    }
  }, [dispatch])

  return null
}

export default AuthSync
