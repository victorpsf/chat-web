const http = require('http')
const express = require('express')
const app = express();

app.use('/', express.static('public/html'))
app.use('/css', express.static('public/css'))
app.use('/js', express.static('public/js'))

const server = http.createServer(app);
server.listen(3000, () => console.log('server open in http://localhost:3000/'))
