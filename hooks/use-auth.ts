import { authApi } from '@/components/api-client'
import useSWR, { SWRResponse } from 'swr'
import { PublicConfiguration } from 'swr/dist/types'

export function useAuth(options?: Partial<PublicConfiguration>) {
  // profile

  const {
    data: profile,
    error,
    mutate
  }: SWRResponse<any, any> = useSWR('/profile', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
    ...options
  })

  const firstLoading = profile === undefined && error === undefined

  async function login() {
    await authApi.login({
      username: 'test1',
      password: '121qwe'
    })

    await mutate()
  }
  async function logout() {
    await authApi.logout()

    mutate(null, false)
  }

  return {
    profile,
    error,
    firstLoading,
    login,
    logout
  }
}
