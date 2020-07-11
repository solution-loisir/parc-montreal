const { get, globalAgent } = require('https');
const { createWriteStream } = require('fs');
const { pipeline } = require('stream');

//globalAgent.keepAlive = true;

const parcOutput = createWriteStream('./_src/_data/parc.json');

get(`https://montreal.l3.ckan.io/api/3/action/datastore_search?resource_id=f34c3555-c285-4ef3-a55c-f0f5c440ad2d&sort=Nom&limit=3000`, res => {
    pipeline(res, parcOutput, error => {
        if(error) return console.error(error.stack);
        console.log("Transfering park's data is done!");
    }); 
}).on('error', error => console.error(error.stack));