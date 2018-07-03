//核心逻辑
var Game = function () {
  //dom元素
  var gameDiv;
  var nextDiv;
  //游戏矩阵
  var gameData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
  //当前方块
  var cur;
  //下一个方块
  var next;
  //divs
  var nextDivs = [];
  var gameDivs = [];

  //初始化div
  var initDiv = function (container, data, divs) {
    for (var i = 0; i < data.length; i++) {
      var div = [];
      for (let j = 0; j < data[0].length; j++) {
        var newNode = document.createElement('div');
        newNode.className = 'none';
        newNode.style.top = (i*20) + 'px';
        newNode.style.left = (j*20) + 'px';
        container.appendChild(newNode);
        div.push(newNode);
      }
      divs.push(div);
    }
  }
  //刷新div
  var refreshDiv = function (data, divs) {
    console.log(data)
    for (var i = 0; i < data.length; i++) {
      for (let j = 0; j < data[0].length; j++) {
        if(data[i][j] == 0) {
          data[i][j].className = 'none';
        } else if (data[i][j] == 1) {
          divs[i][j].className = 'done';
        } else if (data[i][j] == 2) {
          divs[i][j].className = 'current';
        }
      }
    }
  }
  //检测点是否合法
  var check = function (pos, x, y) {
    if (pos.x + x < 0) {//超出上边线
      console.log('0')
      return false;
    } else if (pos.x + x >= gameData.length) {//超出下边线
      console.log('1')
      return false;
    } else if (pos.y + y < 0) { //超出左边线
      console.log('2')
      return false;
    } else if (pos.y + y >= gameData[0].length) {//超出右边线
      console.log('3')
      return false;
    } else if (gameData[pos.x + x][pos.y + y] == 1) {//又落下来的方块
      console.log('4')
      return false;
    } else {
      return true;
    }
  }
  //检测数据是否合法
  var isValid = function (pos, data) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[0].length; j++) {
        if (data[i][j] != 0) {
          if (!check(pos, i, j)) {
            return false;
          }
        }
      }
    }
    return true;
  }
  //清除数据
  var clearData = function () {
    for (let i = 0; i < cur.data.length; i++) {
      for (let j = 0; j < cur.data[0].length; j++) {
        if (check(cur.origin, i, j)) {
          gameData[cur.origin.x + i][cur.origin.y + j] = 0;
        }
      }
    }
  }
  //设置数据
  var setData = function () {
    for (let i = 0; i < cur.data.length; i++) {
      for (let j = 0; j < cur.data[0].length; j++) {
        if (check(cur.origin, i, j)) {
          gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
        }
      }
    }
  }
  //下移
  var down = function () {
    if (cur.canDown(isValid)) {
      clearData();
      cur.down();
      setData();
      refreshDiv(gameData, gameDivs);
      console.log('a')
    }
  }
  this.down = down;

  //初始化
  var init = function (doms) {
    gameDiv = doms.gameDiv;
    nextDiv = doms.nextDiv;
    cur = new Square();
    next = new Square();
    initDiv(gameDiv, gameData, gameDivs);
    initDiv(nextDiv, next.data, nextDivs);
    
    cur.origin.x = 2;
    cur.origin.y = 1;
    setData();
    refreshDiv(gameData, gameDivs);
    refreshDiv(next.data, nextDivs);
  }
  //导出API
  this.init = init;
}