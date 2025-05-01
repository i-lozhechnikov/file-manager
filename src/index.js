import readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import os from 'node:os';
import path from 'node:path';

import { printCurrentDirectory, exitHandler, executeCommand } from "./utils.js";
import { up } from "./general/up.js";
import { cd } from "./general/cd.js";
import { ls } from "./general/ls.js";
import { osOperation } from "./os/os.js"
import { hash } from "./hash/hash.js";
import { compress } from "./compress/compress.js";
import { decompress } from "./compress/decompress.js";
import { cat } from "./fs/cat.js";
import { add } from "./fs/add.js";
import { createNewDirectory } from "./fs/mkdir.js";
import { rename } from "./fs/rename.js";
import { cp } from "./fs/cp.js";
import { mv } from "./fs/move.js";
import { rm } from "./fs/remove.js";

const args = process.argv.slice(2);

const parsedArgs = Object.fromEntries(
    args.map(arg => {
        const [key, value] = arg.replace(/^--/, '').split('=');
        return [key, value];
    })
);

if (!('username' in parsedArgs)) {
    console.error('Error: --username argument is required.');
}

const homeDirectory = os.homedir();
const parentHomeDir = path.dirname(homeDirectory);
process.chdir(homeDirectory);

const username = parsedArgs.username;
console.log(`Welcome to the File Manager, ${username}!`);

const rl = readline.createInterface({ input, output});
printCurrentDirectory();
rl.prompt();
rl.on('line', async (line) => {
    const command = line.trim().split(' ')[0];
    const args = line.trim().split(' ').slice(1);

    try {
        switch (command) {
            case 'up':
                await executeCommand(up, parentHomeDir)
                break;
            case 'cd':
                const goToDir = args[0];
                await executeCommand(cd, goToDir);
                break;
            case 'ls':
                await executeCommand(ls);
                break;
            case 'cat':
                const readFile = args[0];
                await executeCommand(cat, readFile);
                break;
            case 'add':
                const addFileName = args[0];
                await executeCommand(add, addFileName);
                break;
            case 'mkdir':
                const createDirectoryName = args[0];
                await executeCommand(createNewDirectory, createDirectoryName);
                break;
            case 'rename':
                const [fileToRenamePath, newFilename] = args;
                await executeCommand(rename, fileToRenamePath, newFilename);
                break;
            case 'cp':
                const [fileToCopyPath, copyPathToNewDirectory] = args;
                await executeCommand(cp, fileToCopyPath, pathToNewDirectory);
                break;
            case 'mv':
                const [fileToMovePath, movePathToNewDirectory] = args;
                await executeCommand(mv, fileToMovePath, movePathToNewDirectory);
                break;
            case 'rm':
                const fileToRemovePath = args[0];
                await executeCommand(rm, fileToRemovePath);
                break;
            case 'os':
                const flag = args[0];
                await executeCommand(osOperation, flag, homeDirectory);
                break;
            case 'hash':
                const fileToHashPath = args[0];
                await executeCommand(hash, fileToHashPath);
                break;
            case 'compress':
                const [fileToCompressPath, compressedFilePath] = args;
                await executeCommand(compress, fileToCompressPath, compressedFilePath);
                break;
            case 'decompress':
                const [fileToDecompressPath, decompressedFilePath] = args;
                await executeCommand(decompress, fileToDecompressPath, decompressedFilePath);
                break;
            case '.exit':
                exitHandler(rl, username);
                break;
            default:
                console.log(`Unknown command: ${command}`);
        }
    } catch (err) {
        console.error(`Operation failed. ${err}`)
    }

    rl.prompt();
});

rl.on('SIGINT', () => {
    exitHandler(rl, username);
});
