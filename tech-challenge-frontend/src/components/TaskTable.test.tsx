import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Task, Status } from '../types'
import '@testing-library/jest-dom/vitest'
import { TaskTable } from './TaskTable'

vi.mock('./CreateTaskRow', () => {
  return {
    CreateTaskRow: vi.fn(() => <tr data-testid="CreateTaskRow" />),
  }
})

const mockCreateTask = vi.fn()
const mockDeleteTask = vi.fn()
const mockEditTask = vi.fn()

let mockTasks: Task[] = []

const dateTommorrow = new Date()
dateTommorrow.setDate(dateTommorrow.getDate() + 1)

const mockTask1: Task = {
  id: 123,
  title: 'mockTitle-123',
  description: 'mockDescription-123',
  status: Status.BLOCKED,
  dueDate: dateTommorrow,
}

const dateInOneWeeksTime = new Date()
dateInOneWeeksTime.setDate(dateInOneWeeksTime.getDate() + 7)

const mockTask2: Task = {
  id: 999,
  title: 'mockTitle-999',
  description: 'mockDescription-999',
  status: Status.FAILED,
  dueDate: dateInOneWeeksTime,
}

describe('TaskTable', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    mockTasks = [mockTask1, mockTask2]
  })

  it('renders the table with no rows of tasks and the create task row when no tasks', () => {
    mockTasks = []

    render(
      <TaskTable
        tasks={mockTasks}
        deleteTask={mockDeleteTask}
        editTask={mockEditTask}
        createTask={mockCreateTask}
      />
    )

    expect(screen.getByText('No Data')).toBeInTheDocument()

    expect(screen.getByTestId('CreateTaskRow')).toBeInTheDocument()
  })

  it('renders the table with rows of tasks and the create task row there are tasks', () => {
    render(
      <TaskTable
        tasks={mockTasks}
        deleteTask={mockDeleteTask}
        editTask={mockEditTask}
        createTask={mockCreateTask}
      />
    )

    expect(screen.queryByText('No Data')).not.toBeInTheDocument()

    const rowForMockTask1 = screen.getByTestId(`taskrow-${mockTask1.id}`)
    within(rowForMockTask1).getByText(mockTask1.title)
    within(rowForMockTask1).getByText(mockTask1.description)
    within(rowForMockTask1).getByText(mockTask1.dueDate.toLocaleDateString())
    const status1 = within(rowForMockTask1).getByTestId(
      `status-${mockTask1.id}`
    )
    expect(status1).toHaveValue(mockTask1.status)
    within(rowForMockTask1).getByRole('button', { name: 'delete' })

    const rowForMockTask2 = screen.getByTestId(`taskrow-${mockTask2.id}`)
    within(rowForMockTask2).getByText(mockTask2.title)
    within(rowForMockTask2).getByText(mockTask2.description)
    within(rowForMockTask2).getByText(mockTask2.dueDate.toLocaleDateString())
    const status2 = within(rowForMockTask2).getByTestId(
      `status-${mockTask2.id}`
    )
    expect(status2).toHaveValue(mockTask2.status)
    within(rowForMockTask2).getByRole('button', { name: 'delete' })

    expect(screen.getByTestId('CreateTaskRow')).toBeInTheDocument()
  })

  it('calls to update status when status changes', async () => {
    render(
      <TaskTable
        tasks={mockTasks}
        deleteTask={mockDeleteTask}
        editTask={mockEditTask}
        createTask={mockCreateTask}
      />
    )

    const statusDropdown = screen.getByTestId('status-123')
    await userEvent.selectOptions(statusDropdown, 'DONE')

    expect(mockEditTask).toHaveBeenLastCalledWith({
      ...mockTask1,
    })
  })

  it('calls to delete task when delete button pressed', async () => {
    render(
      <TaskTable
        tasks={mockTasks}
        deleteTask={mockDeleteTask}
        editTask={mockEditTask}
        createTask={mockCreateTask}
      />
    )

    const deleteButton = screen.getByTestId('delete-999')
    await fireEvent.click(deleteButton)

    expect(mockDeleteTask).toHaveBeenLastCalledWith(999)
  })
})
