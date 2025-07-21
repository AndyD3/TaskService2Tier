import { StatusEnumText } from "./types";

export enum Status {
  NOT_STARTED,
  IN_PROGRESS,
  BLOCKED,
  DONE,
  FAILED,
  map,
}

export const StatusTextMap: StatusEnumText = {
  NOT_STARTED: 'Not started',
  IN_PROGRESS: 'In Progress',
  BLOCKED: 'Blocked',
  DONE: 'Done',
  FAILED: 'Failed',
}
