const csv = require('csvtojson');
const fs = require('fs');

csv()
  .fromFile('./valid-invalid.csv')
  .then(jsonObj => {
    fs.writeFile('./valid-invalid.json', JSON.stringify(jsonObj), () => {});
  });

csv()
  .fromFile('./ratio.csv')
  .then(jsonObj => {
    fs.writeFile('./ratio.json', JSON.stringify(jsonObj), () => {});
  });
