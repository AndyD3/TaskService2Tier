export enum Status {
  'NOT_STARTED' = 'NOT_STARTED',
  'IN_PROGRESS' ='IN_PROGRESS',
  'BLOCKED' = 'BLOCKED',
  'DONE' = 'DONE',
  'FAILED' = 'FAILED'
}

export type Task = {
  id?: number
  title: string
  description: string
  status: Status
  dueDate: Date
}
export type StatusText = {
  [key: string]: string
}