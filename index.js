const koa = require('koa');
const serve = require('koa-static');
const uuid = require('node-uuid');
const app = koa();
const server = require('http').createServer(app.callback());
/** io */
const io = require('socket.io')(server, { path: '/code' });
io.on('connection', function () { /* … */ });
/** io */

app.use(serve(__dirname + '/dist'));

server.listen(5000);

io.on('connection', (socket) => {
  let isInitialized = () => { //fixme change to bool value?
    return socket.roomUuid;
  }

  socket.on('create room', () => {
    //fixme username?
    socket.roomUuid = uuid.v4();
    socket.join(socket.roomUuid);
    socket.emit('create room', socket.roomUuid);
  });

  socket.on('join room', (roomUuid) => {
    //fixme username?
    if (!roomUuid){
      return;
    }
    socket.roomUuid = roomUuid;
    socket.join(socket.roomUuid);
  })

  socket.on('code change', (code) => {
    if (!isInitialized()) {
      return;
    }

    socket.broadcast.to(socket.roomUuid).emit('code change', {
      username: socket.username,
      code: code
    });
  });

  socket.on('add user', (username) => {
    if (addedUser) return;

    socket.username = username;
    socket.emit('login', {
      //FIXME
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.to(socket.roomUuid).emit('user joined', {
      username: socket.username
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.broadcast.to(socket.roomUuid).emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    socket.broadcast.to(socket.roomUuid).emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects perform this
  socket.on('disconnect', () => {
    if (false) { //TODO FIXME

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username
      });
    }
  });
});