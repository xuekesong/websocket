var ws = require('nodejs-websocket');

var PORT = 4000;

var server = ws.createServer(function (conn) {
	console.log('New connection')//当客户端连接过来的的时候会回调一个函数，conn代表那个连接
	conn.on('text', function (str) {//当客户端有消息发送过来的时候会回调一个函数，消息放在str中
		console.log('Received '+str)
		conn.sendText(str);//消息再次发送回去
	})
	conn.on('close', function (code, reason) {
		console.log('Connection closed')
  })
  conn.on('error', function (err) {
    console.log(err);
    console.log('handle err');
  })
}).listen(PORT);

console.log('websocket server listening on port' + PORT);