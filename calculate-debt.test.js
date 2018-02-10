const assert = require('assert');
const calculateDebt = require('./calculate-debt');

describe('calculate-debt', () => {
    it('should calculate total debt for 2 related items', () => {
        const result = calculateDebt([
            ['Alice', 'Bob', '10'],
            ['Alice', 'Bob', '20']
        ]);

        assert.equal(result.length, 1, 'Result items count');
        assert.deepStrictEqual(result[0], ['Alice', 'Bob', '30.00']);
    })

    it('should calculate total debt for 2 pairs of 2 related items', () => {
        const result = calculateDebt([
            ['Alice', 'Bob', '10'],
            ['Carol', 'Bob', '11'],
            ['Alice', 'Bob', '10'],
            ['Carol', 'Bob', '18']
        ]);

        assert.equal(result.length, 2, 'Result items count');
        assert.deepStrictEqual(result[0], ['Alice', 'Bob', '20.00']);
        assert.deepStrictEqual(result[1], ['Carol', 'Bob', '29.00']);
    })

    it('should return results with 2 digits after comma', () => {
        const result = calculateDebt([
            ['Alice', 'Bob', '10.004'],
            ['Alice', 'Bob', '11.0103'],
        ]);

        assert.equal(result.length, 1, 'Result items count');
        assert.deepStrictEqual(result[0], ['Alice', 'Bob', '21.01']);
    })

    it('should throw in case if invalid number passed', () => {
        assert.throws(() => calculateDebt([
            ['Alice', 'Bob', '10.004'],
            ['Alice', 'Bob', '!10'],
        ]));
    })

    it('should sort results', () => {
        const result = calculateDebt([
            ['Carol', 'Bob', '11'],
            ['Alice', 'Bob', '10'],
            ['Alice', 'Ann', '10'],
            ['Alice', 'Bob', '10'],
            ['Carol', 'Bob', '18']
        ]);

        assert.equal(result.length, 3, 'Result items count');
        assert.deepStrictEqual(result[0], ['Alice', 'Ann', '10.00']);
        assert.deepStrictEqual(result[1], ['Alice', 'Bob', '20.00']);
        assert.deepStrictEqual(result[2], ['Carol', 'Bob', '29.00']);
    })
});