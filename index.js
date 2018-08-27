const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')

function staticRoot(staticPath, req, res) {

  let pathObj = url.parse(req.url, true)

  if (pathObj.pathname === '/') {
    pathObj.pathname += 'index.html'
  }

  const filePath = path.join(staticPath, pathObj.pathname)

  fs.readFile(filePath, 'binary', function (err, fileContent) {
    if (err) {
      console.log('404')
      res.writeHead(404, 'not found')
      res.end('<h1>404 Not Found</h1>')
    } else {
      console.log('ok')
      res.writeHead(200, 'OK')
      res.write(fileContent, 'binary')
      res.end()
    }
  })
}

console.log(path.join(__dirname, 'static'))

const server = http.createServer(function (req, res) {
  staticRoot(path.join(__dirname, 'static'), req, res)
})

server.listen(8080)
console.log('Listening http://localhost:8080')