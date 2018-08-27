const http = require('http')

const server = http.createServer(function (request, response) {
  setTimeout(function () {
    // text/html 形式
    // response.setHeader('Content-Type', 'text/html; charset=utf-8')
    // response.writeHead(200, 'OK')
    // response.write('<html><head><meta charset="utf-8" /></head>')
    // response.write('<body>')
    // response.write('<h1>你好，这是HTML内容返回。</h1>')
    // response.write('</body>')
    // response.write('</html>')

    // text/plain 形式
    response.setHeader('Content-Type', 'text/plain; charset=utf-8')
    response.writeHead(200, 'OK')
    response.write('你好，这是文本内容返回。')

    response.end()
  }, 1000);
})

console.log('Listening http://localhost:8080')
server.listen(8080)