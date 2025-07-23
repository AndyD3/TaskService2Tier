import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import { useDeleteTask } from './useDeleteTask'

const createWrapper = () => {
  const queryClient = new QueryClient()

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

// Mock jest and set the type
vi.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('useDeleteTask', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls to delete send task id, setting isSuccess appropriately', async () => {
    const taskIDToDelete = 9765

    const { result } = renderHook(() => useDeleteTask(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isSuccess).toBeFalsy()

    result.current.mutate(taskIDToDelete)

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy()
    })

    expect(mockedAxios.delete).toHaveBeenLastCalledWith(
      'http://localhost:8080/api/tasks/' + taskIDToDelete
    )
  })
})
