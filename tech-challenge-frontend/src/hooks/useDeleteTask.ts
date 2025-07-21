import { UseBaseMutationResult } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import axiosClient from 'axios'
import { Task } from '../types'

const deleteTask = async (taskID: number): Promise<AxiosResponse<Task[]>> => {
  return await axiosClient.delete(`http://localhost:8080/api/tasks/${taskID}`)
}

export const useDeleteTask = (): UseBaseMutationResult<
  AxiosResponse<Task[], any>,
  unknown,
  number,
  unknown
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (taskID: number) => deleteTask(taskID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
