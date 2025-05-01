import os from 'os';

export function osOperation(flag, homeDirectory) {

    if (!flag.startsWith('--')) {
        console.error('Invalid input: flag must start with --.')

        return;
    }

    switch (flag.slice(2)) {
        case 'EOL':
            eol();
            break;
        case 'cpus':
            cpus();
            break;
        case 'homedir':
            homedir(homeDirectory);
            break;
        case 'username':
            username();
            break;
        case 'architecture':
            architecture();
            break;
        default:
            console.error('Invalid input: flag is not existent.')
    }
}

function eol() {
    console.log(JSON.stringify(os.EOL));
}

function cpus() {
    const cpus = os.cpus();

    console.log(`Overall amount ${cpus.length}`);

    cpus.forEach((cpu, index) => {
        console.log(`CPU ${index + 1}: ${cpu.model}, ${Math.round(cpu.speed / 100) / 10} GHz`);
    });
}

function homedir(homeDirectory) {
    console.log(homeDirectory);
}

function username() {
    console.log(os.userInfo().username);
}

function architecture() {
    console.log(process.arch);
}
