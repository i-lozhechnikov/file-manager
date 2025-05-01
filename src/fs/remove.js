import {isFileExists} from "../utils.js";
import { rm as remove } from 'fs/promises';

export async function rm(fileToRemovePath) {
    const fileToRemoveExists = await isFileExists(fileToRemovePath);

    if (!fileToRemoveExists) {
        console.error('Invalid input. Source file does not exist');

        return;
    }

    remove(fileToRemovePath);
}
