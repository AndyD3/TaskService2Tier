import { UseBaseMutationResult } from '@tanstack/react-query'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Task } from '../types'
import { AxiosResponse } from 'axios'
import axiosClient from 'axios'

const updateTask = async (task: Task): Promise<AxiosResponse<Task>> => {
  return await axiosClient.put<Task>(
    `http://localhost:8080/api/tasks/${task.id}`,
    task
  )
}

export const useUpdateTask = (): UseBaseMutationResult<
  AxiosResponse<Task>,
  unknown,
  Task,
  unknown
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (task: Task) => updateTask(task)
  })
}
