const io = require('./server')
const User = require('./Models/user.model')
io.on('connection',   (socket) => {
    var messAll = [];
  
    socket.on('client-send-message',(data)=>{
        messAll.push(data);
        socket.broadcast.emit('server-send-message', messAll);
        // console.log(messAll);
    })
    //COMMENT 
    socket.on('client-comment', data => {
        socket.broadcast.emit('sv-comment', data);
        console.log('nguoi comment: ',socket.id)
    })
    // socket.on('client-focus-inputCmt', data => {
    //     console.log(data)
    //     socket.broadcast.emit('sv-focus-inputCmt',data)
    // });
    // socket.on('client-stop-focus-inputCmt', data =>{
    //     console.log(data)
    //     socket.broadcast.emit('sv-stop-focus-inputCmt',data)
    // })
  })


  module.exports = io;