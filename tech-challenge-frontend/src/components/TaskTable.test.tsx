import { fireEvent, getByText, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import {CreateTaskRow} from './CreateTaskRow'
import { Task, Status } from '../types';
import '@testing-library/jest-dom/vitest'
import { TaskTable } from './TaskTable';

vi.mock('./CreateTaskRow', () => {
    return {
        CreateTaskRow: vi.fn(()=> <div data-testid='CreateTaskRow' />),
    }
})

const mockCreateTask = vi.fn()
const mockDeleteTask = vi.fn()
const mockEditTask = vi.fn()

let mockTasks : Task[] = [];

describe('TaskTable', () => {

    beforeEach(() => {
      vi.clearAllMocks();

      mockTasks = [];
    });

    it('renders the table with no rows of tasks and the create task row when no tasks', () => {

        render(<TaskTable tasks={mockTasks} deleteTask={mockDeleteTask}
        editTask={mockEditTask} createTask={mockCreateTask}/> )

        // find no tasks
        expect(screen.getByText('No Data')).toBeInTheDocument();

        expect(screen.getByTestId('CreateTaskRow')).toBeInTheDocument();
    });

    it('renders the table with rows of tasks and the create task row there are tasks', () => {

        const mockTask:Task = {
            title: '',
            description: '',
            status: Status.NOT_STARTED,
            dueDate: new Date()
        }
  
        mockTasks = [mockTask];

        render(<TaskTable tasks={mockTasks} deleteTask={mockDeleteTask}
        editTask={mockEditTask} createTask={mockCreateTask}/> )

        expect(screen.queryByText('No Data')).not.toBeInTheDocument();

        expect(screen.getByTestId('CreateTaskRow')).toBeInTheDocument();
    });

    
    it('updates status when status changes', () => {
        //todo
    });

    it('deletes task when delete button pressed', () => {
        //todo
    });


});
