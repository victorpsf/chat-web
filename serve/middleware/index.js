const { request, response } = require('express')

const body = (req = request, res = response, next) => new Promise((resolve) => {
    var bytes = [];
    var resolved = false;

    const handleResolve = (value) => {
        if (resolved) return;

        resolve(value);
        resolved = true;
        next();
    }

    req.setEncoding('utf-8')
    req.on('data', (chunk) => {
        for (const byte of Buffer.from(chunk, 'utf-8')) bytes.push(byte); 
    })

    req.on('end', () => {
        if (resolved) return;

        req.bodyString = Buffer.from(bytes).toString('utf-8');
        try { req.body = JSON.parse(req.bodyString); }
        catch(error) { req.body = {}; }

        handleResolve()
    })
});

module.exports = {
    body
}