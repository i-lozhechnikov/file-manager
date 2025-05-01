import {cp} from "./cp.js";
import {rm} from "./remove.js";

export async function mv(fileToMovePath, movePathToNewDirectory) {
    await cp(fileToMovePath, movePathToNewDirectory);
    await rm(fileToMovePath);
}
