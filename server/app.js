//http://www.expressjs.com.cn/starter/hello-world.html

var express = require('express');
var app = express();
var server = require('http').Server(app);
var multipart = require('connect-multiparty'); //处理文件上传
var modRewrite = require('connect-modrewrite'); //api路由转发
var fs = require('fs');
var path = require('path');
var router = require('./router');
var apiProxyConfig = require('./apiProxyConfig');
var bodyParser = require('body-parser')
var logger = require('morgan');


//https://github.com/socketio/engine.io#methods-1
//https://github.com/socketio/socket.io/issues/1995#issuecomment-73955941
var ioServer = require('socket.io'); //chu
var io = new ioServer(server);

// app.use(multipart({
//   uploadDir: "server/upload"
// }));
app.use(logger('dev'));
//处理 api proxy
app.use(modRewrite(apiProxyConfig.dev));

app.use(bodyParser.json({
  limit: '2mb'
}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '2mb'
}));

app.use(router);

server.listen(8091,function(){
    console.log('server start at port 8091');
});

// 静态文件目录
var staticDir = path.join(__dirname, '/upload');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use('/', express.static(staticDir));


//菜单接口
app.post('/response/findAllPage', function (req, res) {
  fs.readFile(__dirname + '/api/menu.json', {
    encoding: 'utf-8'
  }, function (error, data) {
    if (error) console.log(error);
    res.send(data);
  });
});

app.get('/sidebar-menu.json', function (req, res) {
  fs.readFile(__dirname + '/api/sidebar-menu.json', {
    encoding: 'utf-8'
  }, function (error, data) {
    if (error) console.log(error);
    res.send(data);
  });
});

app.get('/testCard/data.json', function (req, res) {
  fs.readFile(__dirname + '/api/testCard/data.json', {
    encoding: 'utf-8'
  }, function (error, data) {
    if (error) console.log(error);
    res.send(data);
  });
});



/**
 * 处理文件上传
 */
app.post('/file/upload', function (req, res) {

  var uploadResult = {};
  uploadResult.status = '200';
  uploadResult.code = '0';

  if (Math.random() > 0.5) {
    uploadResult.code = '1';
  }

  var file = req.files.file;
  var basename = path.basename(file.path);
  uploadResult.data = {
    path: basename
  }

  for (var i = 0; i <= 1000; i++) {
    console.log(i);
  }

  res.send(uploadResult);
});
