import { useEffect, useState } from 'react'
import { Task, TaskInput } from '../types'

import DatePicker from 'react-datepicker'
import { StatusOptions } from '../constants'
import 'react-datepicker/dist/react-datepicker.css'

type Props = {
  createTask: (task: Task) => void
}

export const CreateTaskRow = ({ createTask }: Props) => {
  const [dueDate, setDueDate] = useState(new Date())

  const emptyFormData= {
    title: '',
    description: '',
    status: ''
  }

  const [formData, setFormData] = useState(emptyFormData)

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {

    event.preventDefault()

    const newTask: TaskInput = {
      description: formData.description,
      title: formData.title,
      status: formData.status,
      dueDate: dueDate,
    }

    console.log('newTask:', newTask)

    createTask(newTask)

    // optimistically assume creation went fine so clear fields.
    // todo add mechanism to check success
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
          onChange={(date) => setDueDate(date)}
        />
      </td>

      <td>
        <select
          className="custom-select"
          name="status"
          onChange={handleChange}
        >
          {StatusOptions.map((option, index) => {
            return <option value={option} key={index}>{option}</option>
          })}
        </select>
      </td>

      <td className="buttonPanel">
        <button disabled={formData.description=='' || formData.title==''} 
        className="cta" 
        onClick={handleSubmit}>
          Create
        </button>
      </td>
    </tr>
  )
}
