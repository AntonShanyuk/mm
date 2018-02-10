const fs = require('fs');
const CSV = require('comma-separated-values');
const calculateDebt = require('./calculate-debt');

const filePath = process.argv[2];

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const parsed = CSV.parse(data, { cast: false });
    const calculated = calculateDebt(parsed);
    calculated.forEach(row => console.log(row.join(',')))
});
