const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const dotenv = require('dotenv').config()
const port = process.env.S_PORT || 3001;

let connections = 0;

io.on('connection', socket => {
  connections++
  console.log('made socket connection...')
  io.sockets.emit('users', connections)

  socket.on('disconnect', ()=>{
    connections--
    io.sockets.emit('users', connections)
    console.log('socket disconnected...')
  })

  socket.on('message', data => {
    io.sockets.emit('message', data)
  })  

  socket.on('username', data => {
    io.sockets.emit('username', data)
  })

  socket.on('typing', data => {
    socket.broadcast.emit('typing', data)
  })
})


server.listen(port, ()=> {
  console.log(`Server running on ${port}...`)
})