import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next'
import { destroyCookie, parseCookies } from 'nookies'
import { AuthTokenError } from '../services/errors/AuthTokenError'

export default function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)

    if (!cookies['animegeeksecretcode.token']) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }

    try {
      return await fn(ctx)
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, 'animegeeksecretcode.token')
        destroyCookie(ctx, 'animegeeksecretcode.refreshToken')

        return {
          redirect: {
            destination: '/login',
            permanent: false
          }
        }
      }
    }
  }
}
