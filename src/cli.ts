#!/usr/bin/env node
import { Command } from 'commander';
import "colors";
import inquirer from 'inquirer';
const program = new Command();
import { createController } from './services/makeController';
import { checkConfig } from './utils';
import { init } from './services/artisanInit';
import { createService } from './services/makeService';
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
    .option("-s,--service", "Create a service with the controller")
    .description('Generate a new controller')
    .action(async (name, options) => {
        await checkConfig();
        let service = false;
        if (options.service) {
            service = options.service;
        }
        createController(name, service);
    });
// Create a simple "make:services" command
program
    .command('make:service <name>')
    .option("-c,--controller", "Create a controller with the service")
    .description('Generate a new service')
    .action(async (name) => {
        await checkConfig();
        createService(name);
    });
//test
program.command("test <name>")
    .option("-c,--config", "Check config file")
    .action(async (name, options) => {
        await checkConfig();
        console.log(program.opts())
        console.log(name)
        console.log(options)
        console.log("passed test.".green);
    });
// Parse the CLI input
program.parse(process.argv);
// If no command is provided, show help
if (!process.argv.slice(2).length) {
    program.help();
}
