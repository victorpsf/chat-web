const test = require('node:test')
const asserts = require('assert') 

const { isString, isNullOrUndefined } = require('../source/util/type')

module.exports = function () {
    test('isString(string)', () => asserts.strictEqual(true, isString('1,0'), 'is not type string'))
    test('isString(null)', () => asserts.strictEqual(true, isString(null), 'is not type string'))
    test('isString(undefined)', () => asserts.strictEqual(true, isString(undefined), 'is not type string'))
    test('isString([])', () => asserts.strictEqual(true, isString([]), 'is not type string'))
    test('isString({})', () => asserts.strictEqual(true, isString({}), 'is not type string'))
    test('isString(new Date())', () => asserts.strictEqual(true, isString(new Date()), 'is not type string'))

    test('isNullOrUndefined(null)', () => asserts.strictEqual(true, isNullOrUndefined(null), 'is not null or undefined'))
    test('isNullOrUndefined(undefined)', () => asserts.strictEqual(true, isNullOrUndefined(undefined), 'is not null or undefined'))
    test('isNullOrUndefined(0)', () => asserts.strictEqual(true, isNullOrUndefined(0), 'is not null or undefined'))
    test('isNullOrUndefined(\'\')', () => asserts.strictEqual(true, isNullOrUndefined(''), 'is not null or undefined'))
    test('isNullOrUndefined([])', () => asserts.strictEqual(true, isNullOrUndefined([]), 'is not null or undefined'))
    test('isNullOrUndefined({})', () => asserts.strictEqual(true, isNullOrUndefined({}), 'is not null or undefined'))
}