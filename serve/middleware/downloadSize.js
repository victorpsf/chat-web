const { getFloatValue, getStringSequence } = require('../source/util/extract')

class DownloadSize {
    constructor(size) {
        this.types = [ 'B', 'KB', 'MB', 'GB', 'TB' ];
        this.size = getFloatValue(size);
        this.type = getStringSequence(size);
    }

    getIndexType(type) {
        return this.types.findIndex(a => a === type)
    }

    validateType() {
        if (this.getIndexType(this.type) >= 0) return;
        throw new Error('Type size not correct');
    }

    transform(size, currentType, toType) {
        if (this.getIndexType(currentType) >= this.getIndexType(toType))
            return size;

        switch (currentType) {
            case 'B':
                return this.transform(Math.round(size / 1024), 'KB', toType);
            case 'KB':
                return this.transform(Math.round(size / 1024), 'MB', toType);
            case 'MB':
                return this.transform(Math.round(size / 1024), 'GB', toType);
            case 'GB':
                return this.transform(Math.round(size / 1024), 'TB', toType);
            case 'TB':
                return Math.round(size / 1024);
            default:
                return size;
        }
    }

    ableToContinueDownload(size = 0) {
        return this.transform(size, 'B', this.type) < this.size;
    }
}

module.exports = DownloadSize;