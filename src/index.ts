import { readData } from "./jsonHelper";

function main() {
    const data = readData('data.json');

    console.log(data);
}

main();