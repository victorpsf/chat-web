const { IncomingMessage, ServerResponse } = require('http')
const fs = require('fs');
const pathModule = require('path')
const mainPath = require.main.path;

const DownloadSize = require('./downloadSize')
const NotFoundException = require('./exceptions/NotFoundException')
const LargeValueDownloadException = require('./exceptions/LargeValueDownloadException')

const middlewares = [];
const routes = {
    GET: [],
    POST: [],
    PUT: [],
    DELETE: [],
    has: function (method, path) {
        return !!this[method].find((a) => a.path === path);
    }
}
const staticRoutes = {}
const configuration = {
    downloadSize: new DownloadSize('1MB'),
}

const extractQueryString = function (request = new IncomingMessage()) {
    const [url, queryString] = request.url.split('?');

    request.url = url;
    request.queryString = queryString ?? '';

    request.query = Object.assign.apply(
        null, 
        [{}].concat(
            (queryString ?? '')
                .split('&')
                .map((a) => {
                    const [key, value] = a.split('=');
                    const result = {}
                    if (key) result[decodeURIComponent(key)] = decodeURIComponent(value ?? '');
                    return result;
                })
        )
    );
}

const extractBody = (request = new IncomingMessage()) => new Promise((resolve, reject) => {
    var bytes = [];
    var resolved = false;

    const handleResolve = (value) => {
        if (resolved) return;

        resolve(value);
        resolved = true;
    }

    const handleReject = (value) => {
        if (resolved) return;

        reject(value);
        resolved = true;
    } 

    request.setEncoding('utf-8')
    request.on('data', (chunk) => {
        for (const byte of Buffer.from(chunk, 'utf-8')) 
            bytes.push(byte); 
        
        if (!configuration.downloadSize.ableToContinueDownload(bytes.length)) {
            handleReject(new LargeValueDownloadException('[ERROR] Large bytes to download', bytes.length));

            request.pause();
            request.emit('end');
        }
    })

    request.on('end', () => {
        if (resolved) return;

        request.bodyString = Buffer.from(bytes).toString('utf-8');
        try { request.body = JSON.parse(request.bodyString); }
        catch(error) { request.body = {}; }

        handleResolve()
    })
});

const isStaticRoute = function (request = new IncomingMessage()) {
    const exec = /^\/[-A-Za-z0-9+\/]*={0,3}(?!.)/.exec(request.url);
    let path = '/'
    if (exec !== null) path = exec[0]
    return request.method === 'GET' && staticRoutes[path];
}

const handleStaticRoutes = async function (request = new IncomingMessage(), response = new ServerResponse()) {
    const pathExec = /^\/[-A-Za-z0-9+\/]*={0,3}(?!.)/.exec(request.url);
    let path = '/'
    if (pathExec !== null) path = pathExec[0]

    const splited = request.url.split('/').filter(a => !!a)
    const file = ((splited.length) ? splited[splited.length - 1]: '') || '';

    const pathToDirectory = pathModule.join(mainPath, staticRoutes[path]);
    const files = fs.readdirSync(pathToDirectory)
        .filter(a => fs.statSync(pathModule.join(pathToDirectory, a)).isFile());
    const fileName = files.find(a => a === file || /[iI][nN][dD][eE][xX]/g.test(a))

    if (!fs.existsSync(pathModule.join(pathToDirectory, fileName)))
        throw new NotFoundException('file not found');

    const stream = fs.createReadStream(pathModule.join(pathToDirectory, fileName))
    stream.pipe(response)
    stream.on('end', () => {
        response.statusCode = 200;
        response.end();
    })
}

const handleMiddleware = async function (request = new IncomingMessage(), response = new ServerResponse()) {
    extractQueryString(request, response);
    await extractBody(request, response);

    for (const _middleware of middlewares)
        await _middleware(request, response);
}

const handleRoutes = async function (request = new IncomingMessage(), response = new ServerResponse()) {
    try {
        await handleMiddleware(request, response);

        if (isStaticRoute(request))
            return await handleStaticRoutes(request, response);

        const route = routes[request.method.toUpperCase()]
            .find(({ path }) => request.url == path)

        if (!route)
            throw new NotFoundException('Don\'t found route');

        await route.invoke(request, response);
    }

    catch (error) { middleware.handleError(error, request, response); }
}

const middleware = function () {
    arguments.callee = middleware;

    if (arguments.length == 0 || arguments.length != 2)
        return arguments.callee;

    handleRoutes(arguments[0], arguments[1])
}

middleware.post = function (path, callback) {
    if (!routes.has('POST', path))
        routes.POST.push({ path, invoke: callback });
    return this;
}

middleware.put = function (path, callback) {
    if (!routes.has('PUT', path))
        routes.PUT.push({ path, invoke: callback });
    return this;
}

middleware.get = function (path, callback) {
    if (!routes.has('GET', path))
        routes.GET.push({ path, invoke: callback });
    return this;
}

middleware.delete = function (path, callback) {
    if (!routes.has('DELETE', path))
        routes.PUT.push({ path, invoke: callback });
    return this;
}

middleware.use = function (callback) {
    middlewares.push(callback);
}

middleware.setDownloadSize = function (size) {
    configuration.downloadSize = new DownloadSize(size);
    configuration.downloadSize.validateType();
    return middleware;
}

middleware.handleError = function (err, request = new IncomingMessage(), response = new ServerResponse()) {
    console.log(err)
    if (err instanceof NotFoundException) response.statusCode = 404;
    if (err instanceof LargeValueDownloadException) response.statusCode = 413;
    else response.statusCode = 500;
    
    response.write(JSON.stringify({ error: 1, message: err?.toString() ?? response.statusMessage }));
    return response.end();
}

middleware.static = function (path, directory) {
    if (!fs.existsSync(pathModule.join(mainPath, directory)))
        throw new Error(`Directory don\'t found ${directory}`);
    if (staticRoutes[path])
        throw new Error(`Static route exists '${path}'`);
    staticRoutes[path] = directory;
    return this;
}

module.exports = middleware;