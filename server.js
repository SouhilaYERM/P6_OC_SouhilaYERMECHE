const http = require('http'); 
const server = http.createServer()
const app = require('./app')

server.listen(process.env.PORT || 3000)