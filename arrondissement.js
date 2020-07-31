const { writeFile } = require('fs');
const uniqBy = require('lodash.uniqby');

module.exports = (raw, area) => {
    const parsed = JSON.parse(raw);
    const uniqParc = uniqBy(parsed.result.records, 'NUM_INDEX');
    const arrondissement = uniqParc.filter(item => {
        return item.GESTION === area;
    });
    let extract = new Set();
    arrondissement.forEach(parc => {
        const newObj = {Nom: parc.Nom, GESTION: parc.GESTION, NUM_INDEX: parc.NUM_INDEX}
        extract.add(newObj);
    });
    const str = JSON.stringify([...extract]);
    //Slugifies the name of the json file to write to.
    const slugWithoutDash = area
    .toLowerCase()
    .normalize('NFD')
    .trim()
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/-| /g, '');
    writeFile(`./_src/_data/${slugWithoutDash}.json`, str, error => {
        if(error) return console.error(error.stack);
        console.log(`Transfering ${area} data is done!`);
    });
}