import { mkdir } from 'fs/promises';

export async function createNewDirectory(directoryName) {
    await mkdir(directoryName, { recursive: true });
}
