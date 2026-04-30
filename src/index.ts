import { readData, writeData } from "./jsonHelper";
import { processData } from "./processor";

function main() {
    const data = readData('data.json');
    const result = processData(data);

    writeData('output.json', result);
    console.log('Processamento concluido!');
}

main();