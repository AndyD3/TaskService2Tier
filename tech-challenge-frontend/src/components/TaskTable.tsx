import React from 'react'
import { Task } from '../types'
import { StatusOptions } from '../constants'

type Props = {
  tasks: Task[]
  deleteTask: (id: number) => void
  editTask: (task: Task) => void
}

export const TaskTable = ({ tasks, deleteTask, editTask }: Props) => {
  const onOptionChangeHandler = (task: Task, event: Event | undefined) => {
    task.status = (event?.target as HTMLInputElement).value

    editTask(task)
  }

  return (
    <table className="dataTable">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Status</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {tasks.length == 0 ? (
          <tr>
            <td colSpan={5}>No Data</td>
          </tr>
        ) : (
          tasks?.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>

              <td>{task.description}</td>
              <td>{task.dueDate}</td>
              <td className="custom-select">
                <select
                  value={task.status}
                  onChange={() => onOptionChangeHandler(task, event)}
                >
                  {StatusOptions.map((option, index) => {
                    return <option key={index}>{option}</option>
                  })}
                </select>
              </td>
              <td className="buttonPanel">
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
