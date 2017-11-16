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

server.listen(process.env.PORT || 5000);

io.on('connection', (socket) => {
  let isInitialized = () => { //fixme change to bool value?
    return socket.roomUuid;
  }

  const leaveRoom = () => {
    socket.roomUuid && socket.leave(socket.roomUuid);
    socket.roomUuid = null;
  }

  socket.on('create room', () => {
    leaveRoom();
    //fixme username?
    socket.roomUuid = uuid.v4();
    socket.join(socket.roomUuid);
    socket.emit('create room', socket.roomUuid);
  });

  socket.on('join room', (roomUuid) => {
    //fixme username?    
    //fixme what if room was not created?
    if (!roomUuid) {
      return;
    }
    leaveRoom();
    socket.roomUuid = roomUuid;
    socket.join(socket.roomUuid);
    socket.emit('joined room', socket.roomUuid);
  })

  socket.on('code change', (change/*{ code: string, filePath: string[] }*/) => {
    if (!isInitialized()) {
      return;
    }

    socket.broadcast.to(socket.roomUuid).emit('code change', {
      username: socket.username,
      change: change
    });
  });

  socket.on('request files structure', (code) => {
    if (!isInitialized()) {
      return;
    }
    socket.broadcast.to(socket.roomUuid).emit('request files structure');
  });

  socket.on('files structure', (files/*{children: TreeFile[]}*/) => {
    if (!isInitialized()) {
      return;
    }
    socket.broadcast.to(socket.roomUuid).emit('files structure', files);
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
/*
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
  */
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