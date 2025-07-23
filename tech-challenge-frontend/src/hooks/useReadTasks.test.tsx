import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Task, Status } from '../types';
import '@testing-library/jest-dom/vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReadTasks } from './useReadTasks';
import axios from 'axios';

const createWrapper = () => {

  const queryClient = new QueryClient()

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

const mockTask1:Task = {
  id: 123,
  title: 'mockTitle-123',
  description: 'mockDescription-123',
  status: Status.IN_PROGRESS,
  dueDate: new Date()
}

const mockTask2:Task = {
  id: 999,
  title: 'mockTitle-999',
  description: 'mockDescription-999',
  status: Status.FAILED,
  dueDate: new Date()
}

const mockTasks=[mockTask1, mockTask2];

// Mock jest and set the type
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useReadTasks', () => {

    beforeEach(() => {
      vi.clearAllMocks();

      mockedAxios.get.mockResolvedValue({
        data: mockTasks
      });
    });

    it('sets isLoading and isSuccess state appropriately when loading, then changes their state when data is retrieved', async () => {

      const { result } = renderHook(() => useReadTasks(), {
        wrapper: createWrapper(),
      })

      expect(result.current.isLoading).toBeTruthy()
      expect(result.current.isSuccess).toBeFalsy()

      await waitFor(() => {
        expect(result.current.isLoading).toBeFalsy();
        expect(result.current.isSuccess).toBeTruthy()
      }
      );
      
      expect(result.current.data).toEqual(mockTasks)
    });

});