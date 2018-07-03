var app = require('http').createServer();
var io = require('socket.io')(app);

app.listen(5005);

//socket 和客户端的连接
io.on('connection', function (socket) {//回调函数
  socket.emit('news', { hello: 'world' });//发送数据
  socket.on('my other event', function (data) {//自定义事件
    console.log(data);
  });
});