import { fireEvent, getByText, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import {CreateTaskRow} from './CreateTaskRow'
import '@testing-library/jest-dom/vitest'

vi.mock('react-datepicker', () => {
    return {
      default: vi.fn(()=> <input data-testid='DatePicker' name="dueDate" value="ff"/>),
    }
})

describe('TaskRow', () => {

    beforeEach(() => {
      vi.clearAllMocks();
    });

    const mockCreateTask = vi.fn();
  
    it('renders the fields and disabled create button', () => {
        render(<CreateTaskRow createTask={mockCreateTask} />)

        const title=screen.getByLabelText('title')        
        expect(title).toHaveValue("");

        const description=screen.getByLabelText('description')
        expect(description).toHaveValue("");

        const status=screen.getByRole('combobox',  {
            name: 'status'
          })
        expect(status).toHaveValue("NOT_STARTED");
        expect(screen.getByTestId('DatePicker')).toBeInTheDocument();

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

        const status=screen.getByRole('combobox',  {
            name: 'status'
          })

        userEvent.selectOptions(status, "DONE");

        const button=screen.getByRole('button',  {
            name: 'create'
          });

        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();

        await fireEvent.click(button)
         
        expect(mockCreateTask).toHaveBeenCalledTimes(1)

        const expected={
            "description": "description-text",
            // "dueDate": new Date(), //todo can I make this nicer??
            "status": 0, //todo - get this nice, is setting a number from enum rther than the text bit
            "title": "title-text",
        };

        expect(mockCreateTask).toHaveBeenLastCalledWith(
            expect.objectContaining(expected)
        );
    });

    // it('clears down fields after create', () => {
    //     //todo

    //     //is this even a thing?
        

    //     render(<CreateTaskRow createTask={mockCreateTask} />)
    // });

});