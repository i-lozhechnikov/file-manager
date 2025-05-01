import crypto from 'crypto';
import { access } from 'fs/promises';
import { createReadStream } from 'fs';


export async function hash(fileToHashPath) {
    const hash = crypto.createHash('sha256');
    const fileExists = await access(fileToHashPath).then(() => true, () => false);

    if (!fileExists) {
        console.log('Invalid input: File does not exist.');

        return;
    }

    const fileStream = createReadStream(fileToHashPath);

    fileStream.on('data', (chunk) => {
        hash.update(chunk);
    });

    fileStream.on('end', () => {
        const finalHash = hash.digest('hex');
        console.log(finalHash);
    });
}
