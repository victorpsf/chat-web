const isNullOrUndefined = function (value) {
    return value === undefined || value === null;
}

const isString = function (value) {
    if (isNullOrUndefined(value))
        return false;
    return typeof value === 'string';
}

const toString = function (value, defaultValue) {
    try {
        if (isNullOrUndefined(value))
            throw new Error('Error: invalid value');

        if (isString(value)) 
            return value;
        
        return value?.toString() ?? defaultValue ?? null;
    }

    catch (ex) { 
        return defaultValue ?? null; 
    }
}

module.exports = {
    isNullOrUndefined,
    isString,
    toString
}