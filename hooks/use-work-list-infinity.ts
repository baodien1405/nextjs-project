import useSWRInfinite, { SWRInfiniteConfiguration } from 'swr/infinite'
import qs from 'qs'

import { ListParams, ListResponse, Work } from '@/models'
import axiosClient from '@/api-client/axios-client'

interface UseWorkListInfinityProps {
  params: Partial<ListParams>
  options?: SWRInfiniteConfiguration
  enabled?: boolean
}

export function useWorkListInfinity({ params, enabled = true, options }: UseWorkListInfinityProps) {
  const swrResponse = useSWRInfinite<ListResponse<Work>>(
    (pageIndex: number, previousPageData: ListResponse<Work>) => {
      if (!enabled) return

      const page = pageIndex + 1
      const query: Partial<ListParams> = {
        ...params,
        _page: page,
        _limit: 5
      }

      if (previousPageData) {
        const { _limit, _totalRows } = previousPageData.pagination || { _limit: 5, _totalRows: 0 }
        const totalPage = Math.ceil(_totalRows / _limit)

        if (page > totalPage) return null
      }

      return `/works?${qs.stringify(query)}`
    },
    (url: string) => axiosClient.get(url),
    {
      revalidateFirstPage: false,
      ...options
    }
  )

  return swrResponse
}
