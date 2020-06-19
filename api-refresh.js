const https = require('https');
const fs = require('fs');
const { pipeline } = require('stream');

//Creating Writable stream
const OUTPUT = fs.createWriteStream('./_src/_data/parc.json');

https.get(`https://montreal.l3.ckan.io/api/3/action/datastore_search?resource_id=f34c3555-c285-4ef3-a55c-f0f5c440ad2d&sort=Nom&limit=3000`, res => {
    //Piping res (IncomingMessage: Readable) to OUTPUT (Writable)
    //The pipeline method wilL manage stream flow and errors!
    pipeline(res, OUTPUT, error => {
        if(error) {
            console.error(error.stack);
        } else {
            console.log('Transfering parks data is done!');
        }
    });  
}).on('error', error => console.error(error.stack));