import { ListResponse, ListParams } from '@/models'
import axiosClient from './axios-client'

export const tagApi = {
  getAll(params: Partial<ListParams>): Promise<ListResponse<string>> {
    return axiosClient.get('/tags', { params })
  }
}
