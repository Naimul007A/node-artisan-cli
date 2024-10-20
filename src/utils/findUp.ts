import fs from 'fs';
import path from 'path';

// Function to find the project root directory
async function getProjectRoot(name: string): Promise<string> {
    let currentDir = process.cwd();
    while (true) {
        const packagePath = path.join(currentDir, name); // Path to package.json

        // Check if package.json exists in the current directory
        if (fs.existsSync(packagePath)) {
            return path.resolve(currentDir); // Return the resolved path of the root
        }

        // Move to the parent directory
        const parentDir = path.join(currentDir, '..');

        // Stop if we've reached the root directory
        if (currentDir === parentDir) {
            console.error('Could not find the project root directory'.red);
            process.exit(1);
        }

        currentDir = parentDir; // Update the current directory to the parent
    }
}

export default getProjectRoot;
