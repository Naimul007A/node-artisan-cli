import 'colors';
import { readArtisanConfig } from '../utils/index';
import * as fs from 'fs';
import * as path from 'path';
async function createFile(name: string) {
    //get config data
    const configData = await readArtisanConfig();
    //get root path
    const rootPath = path.resolve(configData?.rootPath as string);
    const slice = name.split('/');
    let fileName = `${name}`;
    let fullName = `${name}`;
    const ext = path.extname(name);
    if (ext) {
        fileName = `${slice[slice.length - 1]}`;
    } else {
        fileName = `${slice[slice.length - 1]}.${configData?.lang}`;
        fullName = `${name}.${configData?.lang}`;
    }

    const filePath = path.join(rootPath, `${configData?.paths.files}`, `${fullName}`);
    if (fs.existsSync(filePath)) {
        console.log(`File ${fileName} already exists!`.red);
        return;
    } else {
        // check subdirectory and create if not exists
        if (slice.length > 1) {
            for (let i = 0; i < slice.length - 1; i++) {
                const dir = path.join(rootPath, `${configData?.paths.files}`, ...slice.slice(0, i + 1));
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
            }
        }
    }
    slice.pop();
    if (fs.existsSync(path.join(rootPath, `${configData?.paths.files}`, slice.join('/')))) {
        await fs.writeFileSync(filePath, '');
    } else {
        console.log(`Directory not found!`.red);
        process.exit(1);
    }
    if (fs.existsSync(filePath)) {
        console.log(`File ${fileName} created successfully!`.green);
    } else {
        console.log(`Failed to create file ${fileName}!`.red);
    }
}

export { createFile };
