import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from './App'
import { Task, Status } from './types'
import '@testing-library/jest-dom/vitest'

vi.mock('./components/TaskTable', () => ({
  TaskTable: vi.fn(() => <div data-testid="TaskTable" />),
}))

const mockTask: Task = {
  title: '',
  description: '',
  status: Status.NOT_STARTED,
  dueDate: new Date(),
}

let mockReadTasksLoading = false
let mockReadTasksError = false

let mockTasks: Task[] | undefined = [mockTask]

vi.mock('./hooks/useReadTasks', () => {
  return {
    useReadTasks: () => {
      return {
        data: mockTasks,
        isLoading: mockReadTasksLoading,
        isError: mockReadTasksError,
      }
    },
  }
})

vi.mock('./hooks/useDeleteTask', () => {
  return {
    useDeleteTask: () => {
      return {
        mutate: vi.fn(),
      }
    },
  }
})

vi.mock('./hooks/useCreateTask', () => {
  return {
    useCreateTask: () => {
      return {
        mutate: vi.fn(),
        status: 'ok',
      }
    },
  }
})

vi.mock('./hooks/useUpdateTask', () => {
  return {
    useUpdateTask: () => {
      return {
        mutate: vi.fn(),
        status: 'ok',
      }
    },
  }
})

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    mockReadTasksLoading = false
    mockReadTasksError = false
    mockTasks = [mockTask]
  })

  it('renders the app and its content when there are tasks', () => {
    render(<App />)

    expect(screen.getByTestId('container')).toBeInTheDocument()
    expect(screen.getByTestId('title')).toBeInTheDocument()
    expect(screen.getByTestId('instructions')).toBeInTheDocument()
    expect(screen.getByTestId('TaskTable')).toBeInTheDocument()

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  it('does not render the task table when no tasks defined', () => {
    mockTasks = undefined

    render(<App />)

    expect(screen.getByTestId('container')).toBeInTheDocument()
    expect(screen.getByTestId('title')).toBeInTheDocument()
    expect(screen.getByTestId('instructions')).toBeInTheDocument()
    expect(screen.queryByTestId('TaskTable')).not.toBeInTheDocument()

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  it('renders loading message when tasks are loading', () => {
    mockReadTasksLoading = true

    render(<App />)
    expect(screen.getByTestId('container')).toBeInTheDocument()
    expect(screen.getByTestId('title')).toBeInTheDocument()
    expect(screen.getByTestId('instructions')).toBeInTheDocument()
    expect(screen.getByTestId('TaskTable')).toBeInTheDocument()

    expect(screen.getByTestId('loading')).toBeInTheDocument()
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  it('renders error message when error retrieving tasks', () => {
    mockReadTasksError = true

    render(<App />)

    expect(screen.getByTestId('container')).toBeInTheDocument()
    expect(screen.getByTestId('title')).toBeInTheDocument()
    expect(screen.getByTestId('instructions')).toBeInTheDocument()
    expect(screen.getByTestId('TaskTable')).toBeInTheDocument()

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toBeInTheDocument()
  })
})
