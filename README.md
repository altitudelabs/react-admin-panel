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
```
npm install
npm run build:example // Terminal 1. Build react-admin-panel, and place it inside example's node_module directory

cd example 
npm install
npm run build:watch // Terminal 2. Build example
```
*should have webpack dev server running on 8080*


### Deploy example to gh pages
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
    │   // This is where babelified js files end up in, to be bundled by tools like webpack by the library users.
    │   ...
 ```
