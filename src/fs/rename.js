import { rename as renameFile } from 'fs/promises';
import {isFileExists} from "../utils.js";

export async function rename(fileToRenamePath, newFileName) {
    const fileToRenameExists = await isFileExists(fileToRenamePath);

    if (!fileToRenameExists) {
        console.error('Invalid input. File does not exist.');

        return;
    }

    const newFileNameWithPath = fileToRenamePath.replace(/([^\/]+)(?=\.[^\/.]+$)/, newFileName);

    await renameFile(fileToRenamePath, newFileNameWithPath);
}
