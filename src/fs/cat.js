import { createReadStream } from 'fs';
import { isFileExists } from "../utils.js";


export async function cat(file) {
    const fileExists = await isFileExists(file);

    if (!fileExists) {
        console.error('Invalid input. File does not exist.');

        return;
    }

    const readStream = createReadStream(file, { encoding: 'utf-8' });

    readStream.on('data', chunk => {
        console.log(chunk);
    })
}
