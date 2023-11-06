import useSWR, { SWRConfiguration } from 'swr'

import { tagApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import { ListParams } from '@/models'

interface UseTagListProps {
  params?: Partial<ListParams>
  options?: SWRConfiguration
}

export function useTagList({ params = { _page: 1, _limit: 30 }, options }: UseTagListProps) {
  const swrResponse = useSWR([QueryKeys.GET_TAG_LIST, params], () => tagApi.getAll(params), {
    dedupingInterval: 30 * 1000,
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
  })

  return swrResponse
}
