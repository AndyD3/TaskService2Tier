import { fireEvent, getByText, render, renderHook, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
  status: Status[2],
  dueDate: new Date()
}

const mockTask2:Task = {
  id: 999,
  title: 'mockTitle-999',
  description: 'mockDescription-999',
  status: Status[1],
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

    it('returns loading before loaded', async () => {
        //todo
    });

    it('returns task data data', async () => {

      const { result } = renderHook(() => useReadTasks(), {
        wrapper: createWrapper(),
      })

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      
      expect(result.current.data).toEqual(mockTasks)
    });

});