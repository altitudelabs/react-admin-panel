# react-admin-panel
Group of components used for admin panel UI in Altitude Labs

## Goal
This library aims to provide various UI Components that can be used for admin panel projects in Altitude Labs.

### Build
```
npm install
npm run build
```

### Development
*If you are using nvm, simply run `nvm use` to use node & npm version intended for this project*
*Following commands will need to be run in two terminals to hot reload changes in both /example and /react-admin-panel
```
npm install
npm run build:example // Terminal 1. Build react-admin-panel, and place it inside example's node_module directory
```
```
cd example 
npm install
npm run build:watch // Terminal 2. Build example
```
*Once both the above instances are up, a hot reload dev server will be running on localhost:8080*


### Deploy example to gh pages
*Note the entry point HTML for this deploy is gh.html*
```
cd example
npm run deploy-gh
```
*should have the example running on https://altitudelabs.github.io/react-admin-panel/*


### Folder structure
```
project
└───example // example react web project to try & test & demo the module
│   │   ...
│   
└───src // source directory for the module. you will edit this folder to add/update features
│   |   ...
│
└───lib // main package.json directory. 
    │   // This is where webpack outputs end up in
    │   ...
 ```
