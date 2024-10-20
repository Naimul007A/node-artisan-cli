import "colors";
import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
async function init() {
    //check if package.json exists
    const pachageJsonPath = path.join(process.cwd(), 'package.json');
    if (!fs.existsSync(pachageJsonPath)) {
        console.log('please go to the root of your project and run "artisan init"'.red);
        return;
    }
    const content = `{
    "rootPath": "${process.cwd()}",
  "paths": {
    "controllers": "src/controllers",
    "services": "src/services",
    "helpers": "src/helpers",
    "routes": "src/routes",
    "utils": "src/utils",
    "middlewares": "src/middlewares",
    "files": "src"
  },
  "packgeManager": "npm",
  "lang": "ts"
}`;
    //check if artisan.config.json exists
    const filePath = path.join(process.cwd(), 'artisan.config.json');
    if (fs.existsSync(filePath)) {
        console.log('config file already exists!'.red);
        //give option to overwrite
        await inquirer.prompt([
            {
                type: 'confirm',
                name: 'overwrite',
                message: 'Do you want to overwrite the existing config file?',
            }
        ]).then((answers) => {
            if (answers.overwrite) {
                fs.writeFileSync(filePath, content);
                console.log('config file regenerated successfully!'.green);
                //thanks message
                console.log('Thank you for using node-artisan-cli! - Naimul islam'.green);
                //message
                console.log("Please Update the paths in artisan.config.json".bgRed.white);
                process.exit(1);
            } else {
                process.exit(1);
            }
        });

    }
    fs.writeFileSync(filePath, content);
    console.log('config file generated successfully!'.green);
    //thanks message
    console.log('Thank you for using node-artisan-cli! - Naimul islam'.green);
    console.log("Please Update the paths in artisan.config.json".bgRed.white);
    process.exit(1);
}
export { init };
