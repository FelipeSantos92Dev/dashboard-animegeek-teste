import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'

let cookies = parseCookies()
let isRefreshing = false
let failedRequestsQueue = []

export const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    Authorization: `Bearer ${cookies['animegeeksecretcode.token']}`
  }
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response.status === 401) {
      if (error.response.data?.message === 'Token inválido!') {
        cookies = parseCookies()

        const { 'animegeeksecretcode.refreshToken': refreshToken } = cookies

        const originalConfig = error.config

        if (!isRefreshing) {
          isRefreshing = true
          api
            .post('/refresh', {
              refreshToken
            })
            .then((response) => {
              const { token } = response.data.tokenReturn

              setCookie(undefined, 'animegeeksecretcode.token', token, {
                maxAge: 60 * 60 * 24 * 15, // 15 days
                path: '/'
              })

              setCookie(
                undefined,
                'animegeeksecretcode.refreshToken',
                response.data.refreshToken.id,
                {
                  maxAge: 60 * 60 * 24 * 15, // 15 days
                  path: '/'
                }
              )

              api.defaults.headers['Authorization'] = `Bearer ${token}`
              failedRequestsQueue.forEach((request) => request.onSuccess(token))
              failedRequestsQueue = []
            })
            .catch((error) => {
              failedRequestsQueue.forEach((request) => request.onFailure(error))
              failedRequestsQueue = []
            })
            .finally(() => {
              isRefreshing = false
            })
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`

              resolve(api(originalConfig))
            },
            onFailure: (error: AxiosError) => {
              reject(error)
            }
          })
        })
      } else {
        // logout
      }
    }
  }
)
