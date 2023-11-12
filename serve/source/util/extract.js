const { isString, toString } = require('./type')

const getIntValue = function (value) {
    value = toString(value, '0')
    return parseInt(value.split('').filter(a => /\d/.test(a)).join(''))
};

const getFloatValue = function (value) {
    const parts = (toString(value, '0.0')).replace(/\,/g, '.').split('.');
    for (let index = 0; index < parts.length; index++) parts[index] = getIntValue(parts[index]) ?? 0;
    return parseFloat(`${parts.slice(0, 1).join('') ?? '0'}.${parts.slice(1).join('')}`)
};

const getStringSequence = function (value) {
    value = toString(value);
    return value.split('').filter((a) => /[^0-9]/.exec(a)).join('');
}

module.exports = {
    getIntValue,
    getFloatValue,
    getStringSequence
}