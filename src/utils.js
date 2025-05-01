import { access } from 'fs/promises';

export function exitHandler(rl, username) {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    rl.close();
    process.exit(0);
}

export function printCurrentDirectory() {
    console.log(`Current working directory: ${process.cwd()}`);
}

export async function executeCommand(commandFn, ...args) {
    try {
        await commandFn(...args);
        printCurrentDirectory();
    } catch (err) {
        console.error(`Operation failed. ${err}`);
    }
}

export async function isFileExists(file) {
    return await access(file).then(() => true, () => false);
}

export function replaceOrAddPath(filePath, newPath) {
    const fileName = filePath.split('/').pop();
    const sanitizedPath = newPath.replace(/\/$/, '');
    return `${sanitizedPath}/${fileName}`;
}
