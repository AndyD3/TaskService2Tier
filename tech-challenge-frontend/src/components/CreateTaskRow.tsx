import { useState } from 'react'
import { Task } from '../types'

import DatePicker from 'react-datepicker'
import { Status, StatusTextMap } from '../constants'
import 'react-datepicker/dist/react-datepicker.css'

type Props = {
  createTask: (task: Task) => void
}

export const CreateTaskRow = ({ createTask }: Props) => {
  const [dueDate, setDueDate] = useState(new Date())

  const emptyFormData = {
    title: '',
    description: '',
    status: Status.NOT_STARTED,
  }

  const [formData, setFormData] = useState(emptyFormData)

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement>,
    value?: boolean
  ) => {
    event.preventDefault()

    const newTask: Task = {
      description: formData.description,
      title: formData.title,
      status: formData.status,
      dueDate: dueDate,
    }

    console.log('newTask:', newTask)

    createTask(newTask)

    setFormData(emptyFormData)
  }

  return (
    <tr>
      <td>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </td>
      <td>
        <DatePicker
          id="dueDateText"
          name="dueDate"
          showIcon
          dateFormat="dd/MM/YYYY"
          selected={dueDate}
          onChange={(date) => setDueDate(date!)}
        />
      </td>

      <td>
        <select className="custom-select" name="status" onChange={handleChange}>
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
          disabled={formData.description == '' || formData.title == ''}
          className="cta"
          onClick={handleSubmit}
        >
          Create
        </button>
      </td>
    </tr>
  )
}
