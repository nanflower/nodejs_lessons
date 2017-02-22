//HTTP服务器和客户端功能
var http = require('http');
//文件系统相关功能
var fs = require('fs');
//文件系统路径相关功能
var path = require('path');
//根据文件扩展名得出MIME类型
var mime = require('mime');
//缓存文件内容的对象
var cache = {};

function send404 (response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: resource not found.');
  response.emd();
}

function sendFile (response, filePath, fileContents) {
  response.writeHead(
    200,
    {"Content-Type": mime.lookup(path.basename(filePath))}
  );
  response.end(fileContents);
}

function serverStatic (response, cache, absPath) {
  //检查文件是否缓存在内存
  if (cache[absPath]) {
    sendFile(response, absPath, cache[absPath]);
  } else {
    //检查文件是否存在
    fs.exists(absPath, function (exists) {
      if (exists) {
        //磁盘读取文件
        fs.readFile(absPath, function (err, data) {
          if (err) {
            send404(response);
          } else {
            cache[absPath] = data;
            sendFile(response, absPath, data);
          }
        });
      } else {
        send404(response);
      }
    })
  }
}
