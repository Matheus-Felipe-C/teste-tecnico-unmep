import { readData, writeData } from "./jsonHelper";
import { processData } from "./processor";

function main() {
    const data = readData('data.json');
    const result = processData(data);

    writeData('result.json', result);
    console.log('Processamento concluido!');
}

main();