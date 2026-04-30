import { RecordItem } from "./types";

export function processData(data: RecordItem[]) {
    let ignoredRecords = 0;

    // Filtra registros invalidos (menor ou igual a 0)
    const validRecords = data.filter((record) => {
        if (record.minutes <= 0) {
            ignoredRecords++;
            return false;
        }

        return true;
    });

    // Calcula total por tarefa
    const taskMap = new Map<number, { taskName: string; totalMinutes: number }>();

    for (const record of validRecords) {
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

    return {
        validRecords,
        tasks
    }
}