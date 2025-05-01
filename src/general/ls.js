import { readdir } from 'node:fs/promises';

export async function ls() {
    const currentDir = process.cwd();

    const files = await readdir(currentDir, { withFileTypes: true });

    const result = files.map((file) => ({
        Name: file.name,
        Type: file.isDirectory() ? 'directory' : 'file'
    }));

    console.table(result);
}
