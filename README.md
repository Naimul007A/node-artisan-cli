# Node artisan cli

Node Artisan CLI is a command-line tool for Node.js applications, inspired by PHP Artisan. It provides an easy-to-use interface to automate common tasks like scaffolding, modules , and more, making Node.js project management more efficient and intuitive.

Let me know if you'd like to tweak this further!

## Install
You can install the package globally using npm, yarn, or pnpm:
```
npm install node-artisan-cli -g
or
yarn add global node-artisan-cli
or
pnpm add global node-artisan-cli
```

or
You can also use npx to run the package without installing it:
```
npx node-artisan-cli
```
## verify the installation
```
artisan --version
```

## Basic Usage
### Step(1): First init config of your project
Go to your project root directory and run the following command:
```
artisan init
```
### Step(2): Update artisan.config.json of your project
Change all the paths according to your project structure in the artisan.config.json file.
```
{
  "rootPath": "", // Don't change this
  // Change the paths according to your project structure
  "paths": {
    "controllers": "src/controllers",
    "services": "src/services",
    "helpers": "src/helpers",
    "routes": "src/routes",
    "utils": "src/utils",
    "middlewares": "src/middlewares",
    "files": "src"
  },
  "packageManager": "npm", // Change this to your favorite package manager
  "lang": "ts" // which language you are using in your project
}
```
### Step(3): Available Commands
```
artisan
or
artisan --help
```


Note: If you want to contribute in this project.please Read [CONTRIBUTING.md](https://github.com/Naimul007A/node-artisan-cli) file.

## Thank you so much for Using our package
