# BasisFuelPHP

This repository is customized FuelPHP application source code as a foundation.

## How to Development.

### Frontend

#### Task runner

This project has Gulp as task runner, Gulp can build some static files for frontend.

When you want to build own JavaScript and SASS files by compass, perform the below.  
The command will be watching the files to be build target until type `Ctrl+c`.  
The static files will be arranged public directory while being compressed.  
However the static files won't be compressed if the command has `--dev` switch. Ex: `gulp --dev`
```
gulp
```

When you want to build 3rd party products by bower, perform the below.  
The static files will be arranged public directory while being compressed.  
However the static files won't be compressed if the command has `--dev` switch. Ex: `gulp bower --dev`
```
gulp bower
```

#### Directory structure
```
public # Root path as website
├── assets
│   ├── css # Application's Stylesheets
│   ├── fonts # Application's fonts
│   ├── images # Application's images
│   ├── js # Application's JavaScripts
│   └── libs # 3rd party products
└── index.php
```

### Backend

* Twig