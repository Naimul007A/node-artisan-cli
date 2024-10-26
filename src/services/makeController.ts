import 'colors';
import { ControllerContent } from '../conents/controllerContent';
import { readArtisanConfig } from '../utils/index';
import * as fs from 'fs';
import * as path from 'path';
import { createService } from './makeService';
async function createController(name: string, service: boolean = false) {
//get config data
    const configData = await readArtisanConfig();
    //get root path
    const rootPath = path.resolve(configData?.rootPath as string);
    //check Controllers Dir exists
    const ServicePath = path.join(rootPath, `${configData?.paths.controllers}`);
    if (!fs.existsSync(ServicePath)) {
        fs.mkdirSync(ServicePath, { recursive: true });
    }
    const filePath = path.join(rootPath, `${configData?.paths.controllers}`, `${name}.${configData?.lang}`);
    if (fs.existsSync(filePath)) {
        console.log(`Controller ${name}.${configData?.lang} already exists!`.red);
        return;
    } else {
        const slice = name.split('/');
        console.log(`Creating controller ${slice[slice.length - 1]}...`.yellow);
        // check subdirectory and create if not exists
        if (slice.length > 1) {
            for (let i = 0; i < slice.length - 1; i++) {
                const dir = path.join(rootPath, `${configData?.paths.controllers}`, ...slice.slice(0, i + 1));
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
        //get without last element of slice
        slice.pop();
        const content = ControllerContent(mainName.toLowerCase(), configData?.lang as string, service, `${slice.join('/')}${mainName}Service`);
        if (fs.existsSync(path.join(rootPath, `${configData?.paths.controllers}`, slice.join('/')))) {
            fs.writeFileSync(filePath, content);
        } else {
            console.log(`Directory not found!`.red);
            return;
        }
        //create a service with controller
        if (service) {
            const serviceName = `${slice.join('/')}${mainName}Service`;
            await createService(serviceName);
        }
        if (fs.existsSync(filePath)) {
            console.log(`Controller ${name}.${configData?.lang} created successfully!`.green);
        } else {
            console.log(`Failed to create controller ${name}!`.red);
        }
    }
}

export { createController };
