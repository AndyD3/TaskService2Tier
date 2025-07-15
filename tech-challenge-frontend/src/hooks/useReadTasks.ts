import { QueryObserverResult, useQuery } from '@tanstack/react-query'
import axiosClient, { AxiosResponse } from 'axios'
import { Task } from '../types'

const readTasks = async (): Promise<AxiosResponse<Task[]>> => {
  return await axiosClient.get<Task[]>(`http://localhost:8080/api/tasks`)
}

export const useReadTasks = (): QueryObserverResult<Task[]> => {
  return useQuery<Task[]>({
    queryFn: async () => {
      const { data } = await readTasks()
      return data
    },

    queryKey: ['tasks'],
  })
}
