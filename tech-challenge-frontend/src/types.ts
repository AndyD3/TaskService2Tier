export enum Status {
  NOT_STARTED,
  IN_PROGRESS,
  BLOCKED,
  DONE,
  FAILED
}

export type Task = {
  id?: number
  title: string
  description: string
  status: Status
  dueDate: Date
}
export type StatusEnumText = {
  [key: string]: string
}