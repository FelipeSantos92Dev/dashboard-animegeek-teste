import { useContext } from 'react'
import { AuthContex } from '../contexts/AuthContext'

export function useCan(role: string) {
  const { user, isAuthenticated } = useContext(AuthContex)

  if (!isAuthenticated) {
    return false
  }

  if (role == user.role) {
    return true
  } else {
    return false
  }
}
