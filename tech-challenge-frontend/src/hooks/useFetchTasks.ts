import { QueryObserverResult, useQuery } from '@tanstack/react-query'
import axiosClient, { AxiosResponse } from 'axios'
import { Task } from '../types'

const fetchTasks = async (): Promise<AxiosResponse<Task[]>> => {
  return await axiosClient.get<Task[]>(`http://localhost:8080/api/tasks`)
}

export const useFetchTasks = (): QueryObserverResult<Task[]> => {
  return useQuery<Task[]>({
    queryFn: async () => {
      const { data } = await fetchTasks()
      return data
    },

    queryKey: ['tasks'],
  })
}
