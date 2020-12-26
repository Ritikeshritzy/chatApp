//node server which will handle socket io connections
const io = require('socket.io')(8000);

const users = {};

io.on('connection', socket =>{
    //if any user joins, let other users connected to the sever know!
    socket.on('new-user-joined', name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    //if someone sends a msg, bradcast it to other people
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message:message, name:users[socket.id]});
    });

    //if someone leaves the chat, let others know
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})