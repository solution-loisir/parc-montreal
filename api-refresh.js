const { get, globalAgent } = require('https');
const { writeFile } = require('fs');
const uniqBy = require('lodash.uniqby');

//globalAgent.keepAlive = true;

get(`https://montreal.l3.ckan.io/api/3/action/datastore_search?resource_id=f34c3555-c285-4ef3-a55c-f0f5c440ad2d&sort=Nom&limit=3000`, res => {
    let raw = '';
    res.on('data', data => { raw += data });
    res.on('end', () => {
        const parsed = JSON.parse(raw);
        const newArray = uniqBy(parsed.result.records, 'NUM_INDEX');
        let extract = new Set();
        newArray.forEach(item => {
            const newObj = {Nom: item.Nom, GESTION: item.GESTION, NUM_INDEX: item.NUM_INDEX}
            extract.add(newObj);
        });
        const str = JSON.stringify([...extract]);
        writeFile('./_src/_data/parc.json', str, error => {
            if(error) return console.error(error.stack);
            console.log("Transfering park's data is done!");
        });
    });
}).on('error', error => console.error(error.stack));