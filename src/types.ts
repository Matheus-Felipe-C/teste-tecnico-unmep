export interface RecordItem {
    userId: number,
    userName: string,
    taskId: number,
    taskName: string
    status: string,
    minutes: number,

}

export interface TaskItem {
    taskId: number,
    taskName: string,
    totalMinutes: number,
    percentage: string
}

export interface EmployeeItem {
    userId: number,
    userName: string,
    totalMinutes: number,
    distinctTasks: number,
    taskIds: number[]
}