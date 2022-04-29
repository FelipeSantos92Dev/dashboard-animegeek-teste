import { useRouter } from 'next/router'
import { createContext, ReactNode, useState } from 'react'
import { api } from '../services/api'

type User = {
  email: string
  name: string
  role: string
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  isAuthenticated: boolean
  user?: User
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContex = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('auth', {
        email,
        password
      })

      const {
        tokenReturn: { user }
      } = response.data

      const name = user.name
      const role = user.role

      setUser({ email, name, role })

      router.push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContex.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContex.Provider>
  )
}
