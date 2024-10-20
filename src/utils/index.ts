import fs from 'fs';
import path from 'path';
import 'colors';
import getProjectRoot from './findUp';

async function checkPackageJson(name: string) {
    const filePath = path.resolve(`${await getProjectRoot('package.json')}`, 'package.json');
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        if (jsonData.dependencies[name] || jsonData.devDependencies[name]) {
            return true;
        }
    }
    return false;
}
interface Config {
    rootPath: string,
    paths: {
        controllers: string;
        services: string;
        helpers: string;
        models: string;
        routes: string;
        views: string;
        utils: string;
        middlewares: string;
        files: string;
    },
    lang: string,
    packageManager: string,
}
async function readArtisanConfig() {
    const filePath = path.resolve(`${await getProjectRoot('artisan.config.json')}`, 'artisan.config.json');
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data) as Config;
        // validate config file
        if (!jsonData.paths || !jsonData.lang || !jsonData.packageManager) {
            console.log('Invalid config file!'.red);
            console.log('Please run "artisan init" to create a new config file.'.yellow);
            console.log('artisan init'.green);
            process.exit(1);
        }
        return jsonData;
    } else {
        console.log('config file not found!'.red);
        console.log('Please run "artisan init" to create a new config file.'.yellow);
        console.log('artisan init'.green);
        return;
    }
}
async function checkConfig() {
    const filePath = path.resolve(`${await getProjectRoot('artisan.config.json')}`, 'artisan.config.json');
    if (fs.existsSync(filePath)) {
        return true;
    }
    console.log('config file not found!'.red);
    console.log('Please run "artisan init" to create a new config file.'.yellow);
    console.log('`artisan init`'.green);
    process.exit(1);
}
function infoShow() {
    const { version, name } = require("../../package.json");
    console.log(`${name}@${version} By Naimul islam`.bgCyan.black);
    console.log("Welcome to Node Artisan CLI".bgGreen.black);
}
export { checkPackageJson, readArtisanConfig, checkConfig };
