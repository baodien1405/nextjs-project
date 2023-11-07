import { toast } from 'react-toastify'
import { Arguments, useSWRConfig } from 'swr'

import { workApi } from '@/api-client'
import { getErrorMessage } from '@/utils'
import { QueryKeys } from '@/constants'

export function useWorkAdd() {
  const { mutate } = useSWRConfig()

  const addNewWork = async (payload: FormData) => {
    try {
      const newWork = await workApi.add(payload)
      // mutate work list if add successfully
      mutate(
        (key: Arguments) => Array.isArray(key) && key.includes(QueryKeys.GET_WORK_LIST),
        undefined,
        {
          revalidate: true
        }
      )
      return newWork
    } catch (error) {
      const message = getErrorMessage(error)
      toast.error(message)
    }
  }

  return addNewWork
}
