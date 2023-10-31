import useSWR, { SWRResponse } from 'swr'
import { PublicConfiguration } from 'swr/dist/types'

import { authApi } from '@/api-client'
import { LoginPayload } from '@/models'

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

  async function login(payload: LoginPayload) {
    await authApi.login(payload)

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
