// File loading system
fs = require('fs');

// Importing Initializers
console.log('\nLoading Server Initializers ...');

let ini_files = fs.readdirSync(__dirname + '/initializers/');

ini_files.forEach((extracted_file)=>{

    require(__dirname + '/initializers/' + extracted_file);
    console.log('Loading File : ' + extracted_file);

});

// Importing database models
console.log('\nLoading Server Database Models ...');

let model_files = fs.readdirSync(__dirname + '/models/');

model_files.forEach((extracted_file)=>{

    require(__dirname + '/models/' + extracted_file);
    console.log('Loading Model : ' + extracted_file);

});
