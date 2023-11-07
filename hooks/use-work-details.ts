import useSWR, { SWRConfiguration } from 'swr'

import { workApi } from '@/api-client'
import { QueryKeys } from '@/constants'

interface UseWorkDetailsProps {
  workId: string
  options?: SWRConfiguration
  enabled?: boolean
}

export function useWorkDetails({ workId, enabled, options }: UseWorkDetailsProps) {
  const swrResponse = useSWR(
    enabled ? [QueryKeys.GET_WORK_DETAILS, workId] : null,
    () => workApi.get(workId),
    {
      dedupingInterval: 30 * 1000,
      keepPreviousData: true,
      fallbackData: null,
      ...options
    }
  )

  const updateWork = async (payload: FormData) => {
    const newWork = await workApi.update(payload)
    swrResponse.mutate(newWork)
  }

  return { ...swrResponse, updateWork }
}
