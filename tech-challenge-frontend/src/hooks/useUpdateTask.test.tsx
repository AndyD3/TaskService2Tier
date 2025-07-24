import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Task, Status } from '../types'
import '@testing-library/jest-dom/vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import { useUpdateTask } from './useUpdateTask'

const createWrapper = () => {
  const queryClient = new QueryClient()

  // eslint-disable-next-line react/display-name
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

describe('useUpdateTask', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls to update the task, setting isSuccess appropriately', async () => {
    const { result } = renderHook(() => useUpdateTask(), {
      wrapper: createWrapper(),
    })

    result.current.mutate(mockTask1)

    expect(result.current.isSuccess).toBeFalsy()

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy()
    })

    expect(mockedAxios.put).toHaveBeenLastCalledWith(
      'http://localhost:8080/api/tasks/123',
      mockTask1
    )
  })
})
