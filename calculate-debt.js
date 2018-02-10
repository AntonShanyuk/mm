const os = require('os');
const _ = require('lodash');

module.exports =
    data => (
        _
            .chain(data)
            .forEach((item, i) => {
                if (isNaN(Number(item[2]))) {
                    throw new Error(`Line ${i}, '${item.join(',')}': failed to convert ${item[2]} to number`);
                }
            })
            .groupBy(x => x[0] + x[1])
            .map(x =>
                x.reduce((acc, current) => {
                    acc[2] += +current[2];
                    return acc;
                }, [x[0][0], x[0][1], 0]))
            .forEach(x =>
                x[2] = x[2].toFixed(2))
            .sortBy(['0', '1'])
            .value()
    );
