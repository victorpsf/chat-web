const http = require('http')
const express = require('express')
const { body } = require('./middleware/index')
const app = express()
const server = http.createServer(app);
const socket = require('./socket/index')
const cors = require('./middleware/cors')

socket(server);
app.use(body)
app.use(cors)
app.use('/', express.static('public/html'))
app.use('/js', express.static('public/js'))
app.use('/css', express.static('public/css'))
app.use('/img', express.static('public/img'))

server.listen(3000, () => console.log('server open in http://localhost:3000/'))
