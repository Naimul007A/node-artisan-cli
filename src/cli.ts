#!/usr/bin/env node
import { Command } from 'commander';
import "colors";
import inquirer from 'inquirer';
const program = new Command();
import { createController } from './services/makeController';
import { checkConfig } from './utils';
import { init } from './services/artisanInit';
// Default case when no valid command is provided
program
    .option("--version,-v", "output the version number")
    .action((options) => {
        if (program.opts().V) {
            const { version, name } = require("../package.json");
            console.log(`${name}: v${version}`.green);
            return;
        }
        if (process.argv.slice(2).length) {
            console.log('Invalid command'.red);
            program.help();
        }
    });
// Create a simple "init" command
program
    .command('init')
    .description('Generate config file')
    .action(() => {
        init();
    });
// Create a simple "make:controller" command
program
    .command('make:controller <name>')
    .description('Generate a new controller')
    .action(async (name) => {
        await checkConfig();
        createController(name);
    });
//test
program.command("test")
    .action(async () => {
        await checkConfig();
        console.log("passed test.".green);
    });
// Parse the CLI input
program.parse(process.argv);
// If no command is provided, show help
if (!process.argv.slice(2).length) {
    program.help();
}
