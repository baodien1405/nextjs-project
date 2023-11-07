import useSWR, { SWRConfiguration } from 'swr'

import { workApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import { ListParams } from '@/models'

interface UseWorkListProps {
  params: Partial<ListParams>
  options?: SWRConfiguration
  enabled?: boolean
}

export function useWorkList({ params, enabled, options }: UseWorkListProps) {
  const swrResponse = useSWR(
    enabled ? [QueryKeys.GET_WORK_LIST, params] : null,
    () => workApi.getAll(params),
    {
      dedupingInterval: 60 * 1000, // 60s
      keepPreviousData: true,
      fallbackData: {
        data: [],
        pagination: {
          _page: 1,
          _limit: 10,
          _totalRows: 0
        }
      },
      ...options
    }
  )

  return swrResponse
}
