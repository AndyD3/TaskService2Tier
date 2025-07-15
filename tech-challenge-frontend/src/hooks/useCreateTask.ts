import { UseBaseMutationResult } from '@tanstack/react-query'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TaskInput } from '../types'
import { AxiosResponse } from 'axios'
import axiosClient from 'axios'

const createTask = async (task: TaskInput): Promise<AxiosResponse<TaskInput>> => {
  return await axiosClient.post<TaskInput>(
    'http://localhost:8080/api/tasks',
    task
  )
}

export const useCreateTask = (): UseBaseMutationResult<
  AxiosResponse<TaskInput>,
  unknown,
  TaskInput,
  unknown
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (task: TaskInput) => createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    onError: (err) => {
      console.log('failure', err)
    },
  })
}
