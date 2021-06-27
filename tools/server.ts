import express from 'express'
import http from 'http'
import path from 'path'
import proxy from 'http-proxy'
import picomatch from 'picomatch'

import type { AddressInfo } from 'net'

const PORT = 5000, HOST_NAME = `localhost`, PUBLIC_FOLDER = 'dist'

const proxyRoute = (req: express.Request, rewriteUrl: string, target: string) => {
  req.url = req.url.replace(rewriteUrl, '')
  return { request: req, target }
}

const proxies = {
  ['/carts/**/*.js'](req: express.Request) {
    return proxyRoute(req, '/carts', 'http://localhost:3010')
  },
  ['/products/**/*.js'](req: express.Request) {
    return proxyRoute(req, '/products', 'http://localhost:3011')
  },
  ['/www/**/*.js'](req: express.Request) {
    return proxyRoute(req, '/www', 'http://localhost:3012')
  }
}

const apiProxy = proxy.createProxyServer()
const app = express()

app.use(express.static(path.resolve(PUBLIC_FOLDER)))

app.all('/*', function(req: express.Request, res: express.Response, next: Function) {
  const keys = Object.keys(proxies) 
  const proxyUrl = keys.find(key => {
    return picomatch.isMatch(req.url, key)
  })
  if (!proxyUrl) {
    return res.sendFile('index.html', { root: path.resolve(PUBLIC_FOLDER) })
  }
  const { target, request } = proxies[proxyUrl](req)
  apiProxy.web(request, res, { target, changeOrigin: true })
})

const server = http.createServer(app)
server.listen(PORT, HOST_NAME)
  .on('listening', function() {
    const { port, address } = server.address() as AddressInfo;
    console.log(`Express server started on port ${port} at ${address}.`); 
  })