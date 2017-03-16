var http = require('http');
var fs = require('fs');

// var minify = require('minify');

// minify('server.js', function(error, data) {
//   if (error)
//     console.error(error.message);
//   else {
//     fs.writeFile('server.min.js', data, function (err) {
//       if (err)
//         throw err;
//       console.log('File Saved!');
//     })
//   }
// });

//3-6
// http.createServer(function(req, res) {
//   if (req.url == '/') {
//     fs.readFile('./titles.json', function(err, data) {
//       if (err) {
//         console.log(err);
//         res.end('Server Error');
//       } else {
//         var titles = JSON.parse(data.toString());
//         fs.readFile('./template.html', function(err, data) {
//           if (err) {
//             console.log(err);
//             res.end('Server Error');
//           } else {
//             var tmpl = data.toString();
//
//             var html = tmpl.replace('%', titles.join('</li><li>'));
//             res.writeHead(200, {'Content-Type': 'text/html'});
//             res.end(html);
//           }
//         });
//       }
//     });
//   }
// }).listen(3000, function() {
//   console.log('listening 3000');
// });

//3-7
// var server = http.createServer(function (req, res) {
//   getTitles(res);
// }).listen(8000, "127.0.0.1");
//
// function getTitles(res) {
//   fs.readFile('./titles.json', function (err, data) {
//     if (err) {
//       hadError(err, res);
//     } else {
//       getTemplate(JSON.parse(data.toString()), res);
//     }
//   })
// }
//
// function getTemplate(titles, res) {
//   fs.readFile('./template.html', function (err, data) {
//     if (err) {
//       hadError(err, res);
//     } else {
//       formatHtml(titles, data.toString(), res);
//     }
//   })
// }
//
// function formatHtml(titles, tmpl, res) {
//   var html = tmpl.replace('%', titles.join('</li><li>'));
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end(html);
// }
//
// function hadError(err, res) {
//   console.error(err);
//   res.end('Server Error');
// }

//3-8
var server = http.createServer(function (req, res) {
  getTitles(res);
}).listen(8000, "127.0.0.1");

function getTitles(res) {
  fs.readFile('./titles.json', function (err, data) {
    if (err)
      return hadError(err, res);
    getTemplate(JSON.parse(data.toString()), res);
  })
}

function getTemplate(titles, res) {
  fs.readFile('./template.html', function (err, data) {
    if (err)
      return hadError(err, res);
    formatHtml(titles, data.toString(), res);
  })
}

function formatHtml(titles, tmpl, res) {
  var html = tmpl.replace('%', titles.join('</li><li>'));
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);
}

function hadError(err, res) {
  console.error(err);
  res.end('Server Error');
}
