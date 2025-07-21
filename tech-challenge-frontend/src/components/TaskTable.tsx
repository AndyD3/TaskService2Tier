import React from 'react'
import { Status, Task } from '../types'
import { StatusTextMap } from '../constants'
import { CreateTaskRow } from './CreateTaskRow'

type Props = {
  tasks: Task[]
  deleteTask: (id: number) => void
  editTask: (task: Task) => void
  createTask: (task: Task) => void
}

export const TaskTable = ({
  tasks,
  deleteTask,
  editTask,
  createTask,
}: Props) => {
  const onOptionChangeHandler = (task: Task, event: Event | undefined) => {
    task.status = (event?.target as HTMLInputElement).value as unknown as Status

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
              <td>{new Date(task.dueDate).toLocaleDateString()}</td>
              <td>
                <select
                  className="custom-select"
                  value={task.status}
                  onChange={() => onOptionChangeHandler(task, event)}
                >
                  {Object.keys(StatusTextMap).map((entry, index) => {
                    return (
                      <option key={index} value={entry}>
                        {StatusTextMap[entry]}
                      </option>
                    )
                  })}
                </select>
              </td>
              <td className="buttonPanel">
                <button
                  className="caution"
                  onClick={() => deleteTask(task.id!)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
        <CreateTaskRow createTask={createTask} />
      </tbody>
    </table>
  )
}
