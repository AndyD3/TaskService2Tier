import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { useDeleteTask } from './hooks/useDeleteTask'
import { useReadTasks } from './hooks/useReadTasks'
import { useCreateTask } from './hooks/useCreateTask'
import './App.css'
import { TaskTable } from './components/TaskTable'
import { useUpdateTask } from './hooks/useUpdateTask'

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
  const { data: tasks, isLoading, isError } = useReadTasks()
  const { mutate: addTask, status: statusCreateTask } = useCreateTask()
  const { mutate: updateTask, status: statusUpdateTask } = useUpdateTask()

  const errorOccured =
    isError || statusCreateTask == 'error' || statusUpdateTask == 'error'
    
  return (
    <div data-testid="container" className="container">
      <h1 data-testid="title">Task Manager</h1>

      {errorOccured && <div data-testid="error">An error has occurred...</div>}

      {isLoading && <div data-testid="loading">Loading...</div>}

      <div>
        <div data-testid="instructions" className="instructions">
          Tasks can be deleted, created or have their status changed.
        </div>
        {tasks && (
          <TaskTable
            tasks={tasks}
            deleteTask={deleteTask}
            editTask={updateTask}
            createTask={addTask}
          />
        )}
      </div>
    </div>
  )
}
