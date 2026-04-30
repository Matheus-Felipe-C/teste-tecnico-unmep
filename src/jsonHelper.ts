import fs from 'fs';

export function readData(filePath: string) {
    const data = fs.readFileSync(filePath, 'utf-8');

    return JSON.parse(data);
}
