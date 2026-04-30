import { RecordItem } from "./types";

export function processData(data: RecordItem[]) {

    const validRecords = filterValidRecords(data);

    const ignoredRecords = data.length - validRecords.length;

    const tasks = calculateTotalTasks(validRecords); 

    return {
        tasks,
        ignoredRecords,
    }
}

function calculateTotalTasks(records: RecordItem[]) {
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

    const tasks = Array.from(taskMap.entries()).map(([taskId, data]) => ({
        taskId,
        taskName: data.taskName,
        totalMinutes: data.totalMinutes,
    }));

    return tasks;
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