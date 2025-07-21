import { fireEvent, getByText, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import {CreateTaskRow} from './CreateTaskRow'
import '@testing-library/jest-dom/vitest'

vi.mock('react-datepicker', () => {
    return {
      default: vi.fn(()=> <div data-testid='DatePicker' />),
    }
})

describe('TaskRow', () => {

    beforeEach(() => {
      vi.clearAllMocks();
    });

    const mockCreateTask = vi.fn();
  
    it('renders the fields and disabled create button', () => {
        render(<CreateTaskRow createTask={mockCreateTask} />)

        screen.getByLabelText('title')
        expect(screen.getByLabelText('title')).toBeInTheDocument();
        expect(screen.getByLabelText('description')).toBeInTheDocument();
        expect(screen.getByLabelText('status')).toBeInTheDocument();
        expect(screen.getByTestId('DatePicker')).toBeInTheDocument();

        //TODO assert fields default settings

        const button=screen.getByRole('button',  {
            name: 'create'
          });
        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
    });

    it('enables create button when title populated', async () => {

      render(<CreateTaskRow createTask={mockCreateTask} />)

      await userEvent.type(screen.getByLabelText('title'), 'title-text')

      const button=screen.getByRole('button',  {
        name: 'create'
      });

      expect(button).not.toBeDisabled();
    });

    it('calls create with values from fields when pressing button', async () => {
        render(<CreateTaskRow createTask={mockCreateTask} />)

        await userEvent.type(screen.getByLabelText('description'), 'description-text')
        await userEvent.type(screen.getByLabelText('title'), 'title-text')

        const button=screen.getByRole('button',  {
            name: 'create'
          });

        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();

        await fireEvent.click(button)
         
        expect(mockCreateTask).toHaveBeenCalledTimes(1)

        const expected={
            "description": "description-text",
            // "dueDate": null, //todo make nicer...
            "status": 0,
            "title": "title-text",
        };


        expect(mockCreateTask).toHaveBeenLastCalledWith(
            expect.objectContaining(expected)
        );
    });

    it('allows selection of status', () => {
        //todo
        render(<CreateTaskRow createTask={mockCreateTask} />)
    });

    it('clears down fields after create', () => {
        //todo
        render(<CreateTaskRow createTask={mockCreateTask} />)
    });

});