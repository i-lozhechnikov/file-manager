import { createWriteStream } from 'fs';

export async function add(fileName) {
    const writeStream = createWriteStream(fileName);
    writeStream.end();
}
