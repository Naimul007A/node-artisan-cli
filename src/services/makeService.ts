import 'colors';
import { serviceContent } from '../conents/servicesContent';
import { readArtisanConfig } from '../utils/index';
import * as fs from 'fs';
import * as path from 'path';
async function createService(name: string) {
    //check js or ts
    const configData = await readArtisanConfig();
    const rootPath = path.resolve(configData?.rootPath as string);
    const filePath = path.join(rootPath, `${configData?.paths.services}`, `${name}.${configData?.lang}`);
    if (fs.existsSync(filePath)) {
        console.log(`Controller ${name}.${configData?.lang} already exists!`.red);
        return;
    } else {
        const slice = name.split('/');
        console.log(`Creating controller ${slice[slice.length - 1]}...`.yellow);
        // check subdirectory and create if not exists
        if (slice.length > 1) {
            for (let i = 0; i < slice.length - 1; i++) {
                const dir = path.join(process.cwd(), `${configData?.paths.controllers}`, slice[i]);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
            }
        }
        let mainName = slice[slice.length - 1]
            .replace("Controller", "")
            .replace("controller", "");
        //check (.) has in name
        if (mainName.includes(".")) {
            mainName = mainName.split(".")[0];
        }
        const content = serviceContent(mainName.toLowerCase(), configData?.lang as string);
        //get without last element of slice
        slice.pop();
        if (fs.existsSync(path.join(process.cwd(), `${configData?.paths.controllers}`, slice.join('/')))) {
            fs.writeFileSync(filePath, content);
        } else {
            console.log(`Directory not found!`.red);
            return;
        }
        if (fs.existsSync(filePath)) {
            console.log(`Controller ${name}.${configData?.lang} created successfully!`.green);
        } else {
            console.log(`Failed to create controller ${name}!`.red);
        }
    }
}

export { createService };
