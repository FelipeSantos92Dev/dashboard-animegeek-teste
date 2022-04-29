import { useRouter } from 'next/router'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { parseCookies, setCookie } from 'nookies'
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
  user: User
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContex = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'animegeeksecretcode.token': token } = parseCookies()

    if (token) {
      api.get('user').then((response) => {
        const { email, name, role } = response.data.user

        setUser({ email, name, role })
      })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('auth', {
        email,
        password
      })

      const { tokenReturn } = response.data

      setCookie(undefined, 'animegeeksecretcode.token', tokenReturn.token, {
        maxAge: 60 * 60 * 24 * 15, // 15 days
        path: '/'
      })

      const name = tokenReturn.user.name
      const role = tokenReturn.user.role

      setUser({ email, name, role })

      api.defaults.headers['Authorization'] = `Bearer ${tokenReturn.token}`

      router.push('/users')
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
