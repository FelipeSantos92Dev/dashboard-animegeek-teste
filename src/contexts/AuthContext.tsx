import Router from 'next/router'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { api } from '../services/apiClient'

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

export function signOut() {
  destroyCookie(undefined, 'animegeeksecretcode.token')
  destroyCookie(undefined, 'animegeeksecretcode.refreshToken')

  Router.push('/login')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'animegeeksecretcode.token': token } = parseCookies()

    if (token) {
      api
        .get('/user')
        .then((response) => {
          const { email, name, role } = response.data.user

          setUser({ email, name, role })
        })
        .catch(() => {
          signOut()
        })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/auth', {
        email,
        password
      })

      const { token, refreshToken, name, role } = response.data
      console.log({ name, email, role })

      setCookie(undefined, 'animegeeksecretcode.token', token, {
        maxAge: 60 * 60 * 24 * 15, // 15 days
        path: '/'
      })

      setCookie(undefined, 'animegeeksecretcode.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 15, // 15 days
        path: '/'
      })

      setUser({ email, name, role })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      Router.push('/dashboard')
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
