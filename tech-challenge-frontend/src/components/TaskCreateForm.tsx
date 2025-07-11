import { useState } from 'react'
import { Task, TaskInput } from '../types'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type Props = {
  createTask: (task: Task) => void
}

export const TaskCreateForm = ({ createTask }: Props) => {
  const [startDate, setStartDate] = useState(new Date())

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    console.log('handleSubmit ', event)

    event.preventDefault()

    console.log('target:', event.target)

    const newTask: TaskInput = {
      description: event.target.descriptionText.value,
      title: event.target.titleText.value,
      status: 'not started',
      dueDate: event.target.dueDateText.value
    }

    createTask(newTask)

    console.log('task added')
  }

  return (
    <form onSubmit={handleSubmit} className="createForm">
      <label>
        title:
        <input id="titleText" type="text" />
      </label>

      <label>
        description:
        <input id="descriptionText" type="text" />
      </label>

      <label>
        due date:
        <DatePicker
          id="dueDateText"
          showIcon
          dateFormat="yyyy-MM-dd"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </label>

      <input type="submit" value="Submit" />
    </form>
  )
}
