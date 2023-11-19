const { MongoClient } = require('mongodb')
const config = require('../config/mongo')

class MongoConnector {
    constructor() {
        this.client = new MongoClient(
            this.getConnectionString(config)
        )
    }

    getConnectionString ({ HOST, PORT }) {
        return `mongodb://${HOST}:${PORT}/`;
    }

    async connect() {
        await this._connect();
        this.db = this.client.db(config.DB);
        this.collection = this.db.collection(config.COLLECTION);
        return true;
    }
    
    _connect() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.client.connect();
                resolve();
            }

            catch (err) 
            { reject(err); }
        })
    }

    async disconnect() {
        await this._disconnect();
        this.db = null;
        this.collection = null; 
    }
    _disconnect() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.client.close(true)
                resolve();
            }

            catch(err) 
            { reject(err) }
        })
    }

    getCollection() {
        return this.collection;
    }
}

module.exports = MongoConnector;