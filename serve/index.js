const http = require('http')
const middleware = require('./middleware')();

middleware.static('/', 'public/html')
middleware.static('/js', 'public/js')
middleware.static('/css', 'public/css')


const server = http.createServer(middleware);

server.listen(3000, () => console.log('server open in http://localhost:3000/'))
