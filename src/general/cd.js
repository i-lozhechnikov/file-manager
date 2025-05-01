import path from 'node:path';
import fs from 'node:fs';

export function cd(dir) {
    const newDir = path.resolve(process.cwd(), dir);

    if (fs.existsSync(newDir) && fs.lstatSync(newDir).isDirectory()) {
        process.chdir(newDir);
    } else {
        console.log(`Directory ${dir} does not exist.`);
    }
}
