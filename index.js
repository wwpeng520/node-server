const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')

const server = http.createServer(function (req, res) {
  // staticRoot(path.join(__dirname, 'static'), req, res)
  routePath(req, res)
})

server.listen(8080)
console.log('Listening http://localhost:8080')

function routePath(req, res) {
  const pathObj = url.parse(req.url, true)

  let handleFn = routes[pathObj.pathname]
  if (handleFn) {
    req.query = pathObj.query

    // post json 解析
    let body = ''
    req.on('data', function (chunk) {
      body += chunk
    }).on('end', function () {
      req.body = parseBody(body)
      handleFn(req, res)
    })
  } else {
    staticRoot(path.resolve(__dirname, 'static'), req, res)
  }
}

const routes = {
  '/a': function (req, res) {
    res.end(JSON.stringify(req.query))
  },

  '/b': function (req, res) {
    res.end('match /b')
  },

  '/a/c': function (req, res) {
    res.end('match /a/c')
  },

  '/search': function (req, res) {
    res.end('username=' + req.body.username + ',password=' + req.body.password)
  }
}

function staticRoot(staticPath, req, res) {
  let pathObj = url.parse(req.url, true)

  if (pathObj.pathname === '/') {
    pathObj.pathname += 'index.html'
  }

  const filePath = path.join(staticPath, pathObj.pathname)

  fs.readFile(filePath, 'binary', function (err, fileContent) {
    if (err) {
      res.writeHead('404', 'Not Found')
      return res.end()
    }

    res.writeHead(200, 'OK')
    res.write(fileContent, 'binary')
    res.end()
  })
}

function parseBody(body) {
  console.log(body)
  const obj = {}
  body.split('&').forEach(function (str) {
    obj[str.split('=')[0]] = str.split('=')[1]
  })
  return obj
}