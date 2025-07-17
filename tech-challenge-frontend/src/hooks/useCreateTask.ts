import { UseBaseMutationResult } from '@tanstack/react-query'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Task } from '../types'
import { AxiosResponse } from 'axios'
import axiosClient from 'axios'

const createTask = async (task: Task): Promise<AxiosResponse<Task>> => {
  return await axiosClient.post<Task>(
    'http://localhost:8080/api/tasks',
    task
  )
}

export const useCreateTask = (): UseBaseMutationResult<
  AxiosResponse<Task>,
  unknown,
  Task,
  unknown
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (task: Task) => createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    onError: (err) => {
      console.log('failure', err)
    },
  })
}
