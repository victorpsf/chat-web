const test = require('node:test')
const asserts = require('assert') 

const { getFloatValue, getIntValue } = require('../source/util/extract')

module.exports = function () {
    test('getFloatValue(\'1.0\')', () => asserts.strictEqual(1.0, getFloatValue('1,0'), 'is not equal to 1.0'))
    test('getFloatValue(1.0)', () => asserts.strictEqual(1.0, getFloatValue(1.0), 'is not equal to 1.0'))
    test('getFloatValue(1)', () => asserts.strictEqual(1.0, getFloatValue(1), 'is not equal to 1.0'))
    test('getFloatValue(null)', () => asserts.strictEqual(1.0, getFloatValue(null), 'is not equal to 1.0'))
    test('getFloatValue(undefined)', () => asserts.strictEqual(1.0, getFloatValue(undefined), 'is not equal to 1.0'))
    test('getFloatValue([])', () => asserts.strictEqual(1.0, getFloatValue([]), 'is not equal to 1.0'))
    test('getFloatValue({})', () => asserts.strictEqual(1.0, getFloatValue({}), 'is not equal to 1.0'))
    test('getFloatValue(new Date())', () => asserts.strictEqual(1.0, getFloatValue(new Date()), 'is not equal to 1.0'))


    test('getIntValue(\'1\')', () => asserts.strictEqual(1, getIntValue('1'), 'is not equal to 1'))
    test('getIntValue(1)', () => asserts.strictEqual(1, getIntValue(1), 'is not equal to 1'))
    test('getIntValue(1.0)', () => asserts.strictEqual(1, getIntValue(1.0), 'is not equal to 1'))
    test('getIntValue(null)', () => asserts.strictEqual(1, getIntValue(null), 'is not equal to 1'))
    test('getIntValue(undefined)', () => asserts.strictEqual(1, getIntValue(undefined), 'is not equal to 1'))
    test('getIntValue([])', () => asserts.strictEqual(1, getIntValue([]), 'is not equal to 1'))
    test('getIntValue({})', () => asserts.strictEqual(1, getIntValue({}), 'is not equal to 1'))
    test('getIntValue(new Date())', () => asserts.strictEqual(1, getIntValue(new Date()), 'is not equal to 1'))
}