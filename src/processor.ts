import { EmployeeItem, RecordItem, TaskItem } from "./types";


type TaskSummary = {
    tasks: TaskItem[];
    totalMinutes: number;
}

export function processData(data: RecordItem[]) {
    const validRecords = filterValidRecords(data);
    const ignoredRecords = data.length - validRecords.length;
    const { tasks, totalMinutes } = calculateTotalTasks(validRecords);
    const top3TasksPercentage = getTop3Tasks(tasks);
    const mostWorkedTask = top3TasksPercentage.slice(0, 1);

    const employees = getEmployees(validRecords);
    const top3Employees = employees.slice(0,3);

    return {
        totalMinutes,
        tasks,
        mostWorkedTask,
        top3TasksPercentage,
        top3Employees,
        ignoredRecords,
    }
}

function calculateTotalTasks(records: RecordItem[]): TaskSummary {
    const taskMap = new Map<number, { taskName: string; totalMinutes: number }>();

    for (const record of records) {
        const existing = taskMap.get(record.taskId);

        if (existing) {
            existing.totalMinutes += record.minutes;
        } else {
            taskMap.set(record.taskId, {
                totalMinutes: record.minutes,
                taskName: record.taskName,
            });
        }
    }

    const totalMinutes = Array.from(taskMap.values())
        .reduce((sum, task) => sum + task.totalMinutes, 0);

    const tasks: TaskItem[] = Array.from(taskMap.entries()).map(([taskId, data]) => ({
        taskId,
        taskName: data.taskName,
        totalMinutes: data.totalMinutes,
        percentage: ((data.totalMinutes / totalMinutes) * 100).toFixed(2) + '%',
    })).sort((a, b) => b.totalMinutes - a.totalMinutes || a.taskId - b.taskId);

    return {
        tasks,
        totalMinutes
    };
}

function getTop3Tasks(tasks: TaskItem[]) {
    const topTasks = tasks.slice(0, 3)
        .map(({ taskId, taskName, percentage }) => ({
            taskId,
            taskName,
            percentage,
        }));

    return topTasks;
}

function getEmployees(records: RecordItem[]): EmployeeItem[] {
    const employeeMap = new Map<number, { userName: string; totalMinutes: number }>();

    for (const record of records) {
        const existing = employeeMap.get(record.userId);

        existing ? existing.totalMinutes += record.minutes : employeeMap.set(record.userId, {
            totalMinutes: record.minutes,
            userName: record.userName,
        });
    }

    const totalMinutes = Array.from(employeeMap.values())
        .reduce((sum, employee) => sum + employee.totalMinutes, 0);

    const employees: EmployeeItem[] = Array.from(employeeMap.entries()).map(([ userId, data]) => ({
        userId,
        userName: data.userName,
        totalMinutes: data.totalMinutes,
    })).sort((a, b) => b.totalMinutes - a.totalMinutes || a.userId - b.userId);

    return employees;
}

function filterValidRecords(data: RecordItem[]) {
    const validRecords = data.filter((record) => {
        if (record.minutes <= 0) {
            return false;
        }
        return true;
    });

    return validRecords;
}
