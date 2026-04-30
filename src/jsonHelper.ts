import fs from 'fs';

export function readData(filePath: string) {
    const data = fs.readFileSync(filePath, 'utf-8');

    return JSON.parse(data);
}

export function writeData(filePath: string, data: any) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}