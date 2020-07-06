const https = require('https');
const fs = require('fs');
const { pipeline } = require('stream');

const parcOutput = fs.createWriteStream('./_src/_data/parc.json');
const parcCoordinates = fs.createWriteStream('./_src/_data/parc-coordinates.json');

https.get(`https://montreal.l3.ckan.io/api/3/action/datastore_search?resource_id=f34c3555-c285-4ef3-a55c-f0f5c440ad2d&sort=Nom&limit=3000`, res => {
    pipeline(res, parcOutput, error => {
        if(error) return console.error(error.stack);
        console.log("Transfering park's data is done!");
    });  
}).on('error', error => console.error(error.stack));

https.get(`https://montreal.l3.ckan.io/api/3/action/datastore_search?resources_id=35796624-15df-4503-a569-797665f8768e`, res => {
    pipeline(res, parcCoordinates, error => {
        if(error) return console.error(error.stack);
        console.log("Transfering park's coordinates data is done!");
    });  
}).on('error', error => console.error(error.stack));