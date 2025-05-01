import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress } from 'zlib';
import path from 'path';
import {isFileExists, replaceOrAddPath} from "../utils.js";

export async function decompress(fileToDecompressPath, decompressedFilePath) {
    const fileExists = await isFileExists(fileToDecompressPath);
    const extension = path.extname(fileToDecompressPath);

    if (!fileExists || extension !== '.br') {
        console.error('Invalid input. File does not exist or is not compressed.')

        return;
    }

    const decompressedFile = replaceOrAddPath(fileToDecompressPath, decompressedFilePath)

    const gzipStream = createBrotliDecompress();
    const readStream = createReadStream(fileToDecompressPath);
    const writeStream = createWriteStream(decompressedFile.replace(/.br/, ''));

    readStream.pipe(gzipStream).pipe(writeStream);
}

