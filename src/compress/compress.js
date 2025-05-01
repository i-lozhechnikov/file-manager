import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import {  isFileExists, replaceOrAddPath } from "../utils.js";

export async function compress(fileToCompressPath, compressedFilePath) {
    const gzipStream = createBrotliCompress();

    const fileExists = await isFileExists(fileToCompressPath);

    if (!fileExists) {
        console.error('Invalid input. File does not exist.')

        return;
    }

    const compressedFile = replaceOrAddPath(fileToCompressPath, compressedFilePath)

    const readStream = createReadStream(fileToCompressPath);
    const writeStream = createWriteStream(`${compressedFile}.br`);

    readStream.pipe(gzipStream).pipe(writeStream);
}
