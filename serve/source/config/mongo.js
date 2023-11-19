const process = require('process')

const config = {
    HOST: '0.0.0.0',
    PORT: 27017,
    DB: 'APP',
    COLLECTION: 'MESSAGES'
}

for (const ENV in config)
    config[ENV] = process.env[ENV] || config[ENV];

module.exports = config;