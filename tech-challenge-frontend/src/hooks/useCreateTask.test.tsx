import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Task, Status } from '../types'
import '@testing-library/jest-dom/vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import { useCreateTask } from './useCreateTask'

const createWrapper = () => {
  const queryClient = new QueryClient()

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

const mockTask1: Task = {
  id: 123,
  title: 'mockTitle-123',
  description: 'mockDescription-123',
  status: Status.IN_PROGRESS,
  dueDate: new Date(),
}

// Mock jest and set the type
vi.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('useCreateTask', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls to create the task, setting isSuccess appropriately', async () => {
    const { result } = renderHook(() => useCreateTask(), {
      wrapper: createWrapper(),
    })

    result.current.mutate(mockTask1)

    expect(result.current.isSuccess).toBeFalsy()

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy()
    })

    expect(mockedAxios.post).toHaveBeenLastCalledWith(
      'http://localhost:8080/api/tasks',
      mockTask1
    )
  })
})
