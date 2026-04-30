import { RecordItem, TaskItem } from "./types";


type TaskSummary = {
    tasks: TaskItem[];
    totalMinutes: number;
}

export function processData(data: RecordItem[]) {

    const validRecords = filterValidRecords(data);

    const ignoredRecords = data.length - validRecords.length;

    const { tasks, totalMinutes } = calculateTotalTasks(validRecords);

    return {
        totalMinutes,
        tasks,
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
    }));

    return {
        tasks,
        totalMinutes
    };
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
