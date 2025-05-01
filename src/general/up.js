import path from 'node:path';
import fs from 'node:fs';

export function up(homeDirectory) {
    const currentDir = process.cwd();
    const parentDir = path.dirname(currentDir);

    if (fs.existsSync(parentDir) && parentDir !== homeDirectory) {
        process.chdir(parentDir);
    } else {
        console.log('Cannot move up: already at the root directory.');
    }
}
