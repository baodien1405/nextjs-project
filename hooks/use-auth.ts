import useSWR, { SWRConfiguration } from 'swr'

import { authApi } from '@/api-client'
import { LoginPayload, UserProfile } from '@/models'
import { StorageKeys } from '@/constants'

const getUserInfo = (): UserProfile | null => {
  try {
    return JSON.parse(localStorage.getItem(StorageKeys.USER_INFO) || '')
  } catch (error) {
    return null
  }
}

export function useAuth(options?: Partial<SWRConfiguration>) {
  const {
    data: profile,
    error,
    mutate
  } = useSWR<UserProfile | null>('/profile', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
    ...options,
    fallbackData: getUserInfo(),
    onSuccess(data) {
      localStorage.setItem(StorageKeys.USER_INFO, JSON.stringify(data))
    },
    onError(error) {
      console.log(error)
      logout()
    }
  })

  const firstLoading = profile === undefined && error === undefined

  async function login(payload: LoginPayload) {
    await authApi.login(payload)

    await mutate()
  }
  async function logout() {
    await authApi.logout()

    mutate(null, false)
    localStorage.removeItem(StorageKeys.USER_INFO)
  }

  return {
    profile,
    error,
    firstLoading,
    login,
    logout
  }
}
