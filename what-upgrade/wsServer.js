//需要运行该文件 node wsServer.js 
var app = require('http').createServer();//创建http server
var io = require('socket.io')(app);//http包装成io

var PORT = 3004;

var clientCount = 0;

app.listen(PORT);

io.on('connection', function (socket) {
  clientCount++;
  socket.nicknaem = 'user' + clientCount;
  io.emit('enter', socket.nicknaem + ' come in');//io.emit()广播, socket.emit()向客户端发送消息

  socket.on('message', function (str) {
    io.emit('message', socket.nicknaem + ' says: ' + str);
  })

  socket.on('disconnect', function () {//客户端断开
    io.emit('leave', socket.nicknaem + ' left');
  })
})

console.log('websocket server listening on port' + PORT);
