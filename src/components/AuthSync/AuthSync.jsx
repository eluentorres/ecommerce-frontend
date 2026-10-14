import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchMe, logout } from '../../store/authSlice'

function AuthSync() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMe())
  }, [dispatch])

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
