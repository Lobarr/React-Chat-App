// const dotenv = require('dotenv').config()
const io = require('socket.io-client')
const socket = io.connect(process.env.SOCKET_URL || 'localhost:3001')
module.exports = socket;