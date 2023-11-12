class LargeValueDownload extends Error {
    constructor(message, size) {
        super(message);
        this.size = size;
    }
}

module.exports = LargeValueDownload;