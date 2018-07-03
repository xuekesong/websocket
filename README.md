# websocket

WebSocket是HTML5开始提供的一种浏览器与服务器间进行全双工通讯的网络技术。WebSocket通信协议于2011年被IETF定义为标准RFC 6455，WebSocketAPI被W3C定义为标准。在WebSocket API中，浏览器和服务器只需要做一个握手的动作，然后，浏览器和服务器之间就形成了一条快速通道。两者之间就可以数据互相传送。
WebSocket的，目的是在浏览器和服务器之间建立一个不受限的双向通信的通道，比如说，服务器可以任意时刻发送消息给浏览器。
本质是TCP连接，web端是socket,server 和 client可以互相发送消息.

方法：
var webSocket = new WebSocket('ws://echo.websocket.org/');//建立连接
webSocket.onopen = function () {//开始
  console.log('websocket.open');
  document.getElementById('recv').innerHTML = 'Connected';
}
webSocket.onclose = function () {//结束
  console.log('websocket close');
}
webSocket.onmessage = function (e) {//接收到消息之后触发，接收到的信息为e.data
  console.log(e.data);
  document.getElementById('recv').innerHTML = e.data;
}

可在开发者工具中查看信息的传递，在Network面板中勾选WS,就可以在下方看见有一个ws://echo.websocket.org/的协议发出，当点击发送按钮发送消息之后，点击协议查看具体回调就可以在Frames看到数据的信息，绿色代表发送出去的数据，白色代表接收到的数据

node wsServer.js运行本地server

特点：允许浏览器和服务器建立持久连接

#俄罗斯方块--待完成
                           script.js
                          |         |
local.js--我的游戏区域中的逻辑        remote.js--对方游戏区域中的逻辑
                          |       |
                           games.js 核心
     生成方块                  |
    squareFactory.js ---  square.js 方块/上下左右移动
      |               |           |             |             |               |           |
square1.js       square2.js     square3.js     square4.js    square5.js    square6.js     square7.js  代表其中方块
                        