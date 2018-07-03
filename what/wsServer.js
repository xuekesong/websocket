//需要运行该文件 node wsServer.js 
var ws = require('nodejs-websocket');

var PORT = 5000;

var clientCount = 0;

var server = ws.createServer(function (conn) {
  console.log('New connection')//当客户端连接过来的的时候会回调一个函数，conn代表那个连接
  clientCount += 1;
  conn.nicknaem = 'user' + clientCount;
  broadcast(conn.nicknaem + ' come in');
	conn.on('text', function (str) {//当客户端有消息发送过来的时候会回调一个函数，消息放在str中
		console.log('Received '+str)
		broadcast(conn.nicknaem + ' come in');//消息再次发送回去
	})
	conn.on('close', function (code, reason) {
    console.log('Connection closed');
    broadcast(conn.nicknaem + ' left');//离开
  })
  conn.on('error', function (err) {
    console.log(err);
    console.log('handle err');
  })
}).listen(PORT);

console.log('websocket server listening on port' + PORT);

var broadcast = function (str) {
  server.connections.forEach(function (ele) {//server.connections获取所有的连接
    ele.sendText(str);
  })
}