import { createReadStream, createWriteStream } from 'fs';
import {isFileExists, replaceOrAddPath} from "../utils.js";

export async function cp(fileToCopyPath, pathToNewDirectory) {
    const sourceFileExists = await isFileExists(fileToCopyPath);

    if (!sourceFileExists) {
        console.error('Invalid input. Source file does not exist');

        return
    }

    const targetFilePath = replaceOrAddPath(fileToCopyPath, pathToNewDirectory);

    const readStream = createReadStream(fileToCopyPath);
    const writeStream = createWriteStream(targetFilePath);

    readStream.pipe(writeStream);
}
