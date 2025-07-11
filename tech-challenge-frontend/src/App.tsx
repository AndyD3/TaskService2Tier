import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { useDeleteTask } from './hooks/useDeleteTask'
import { useFetchTasks } from './hooks/useFetchTasks'
import { useAddTask } from './hooks/useAddTask'
import { TaskInput } from './types'
import './App.css'
import { TaskTable } from './components/TaskTable'
import { useUpdateTask } from './hooks/useUpdateTask'
import { TaskCreateForm } from './components/TaskCreateForm'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TaskManager />
    </QueryClientProvider>
  )
}

function TaskManager() {
  const { mutate: deleteTask } = useDeleteTask()
  const { data: tasks, isLoading, isError } = useFetchTasks()
  const { mutate: addTask } = useAddTask()
  const { mutate: updateTask } = useUpdateTask()

  if (isError) return 'An error has occurred: ' + isError

  return (
    <div className="container">
      <h1>Task Manager</h1>

      {isLoading && <div>Loading...</div>}

      <div>
        {tasks && (
          <TaskTable
            tasks={tasks}
            deleteTask={deleteTask}
            editTask={updateTask}
          />
        )}
      </div>
      <div>
        <TaskCreateForm createTask={addTask} />
      </div>
    </div>
  )
}
