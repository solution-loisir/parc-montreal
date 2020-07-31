const { get } = require('https');
const { globalAgent } = require('https');
const arrondissement = require('./arrondissement');
const area = require('./_src/_data/areaArray');

//globalAgent.keepAlive = true;

get(`https://montreal.l3.ckan.io/api/3/action/datastore_search?resource_id=f34c3555-c285-4ef3-a55c-f0f5c440ad2d&sort=Nom&limit=3000`, res => {
    let raw = '';
    res.on('data', data => raw += data);
    res.on('end', () => {
        area.forEach(arr => arrondissement(raw, arr));
    });
}).on('error', error => console.error(error.stack));