import express from 'express'
import path from 'path'
import http from 'http'
import WebSocket from 'ws'
import globalVars from './global-vars'
import { monitorBattery } from './src/collect-data/battery'
import { monitorCpuUsage } from './cpu'

monitorCpuUsage()
monitorBattery()

const app = express()
const deviceRouter = require('./routes/device')
const { getWsMessageHandler } = require('./websocket')
const server = http .createServer(app)

const port = 8080
const host = '127.0.0.1'

const STATIC_FILES_PATH = path.join(__dirname, '..', 'front', 'public')

const IS_PROD = process.env.NODE_ENV === 'production'

app.use('/device', deviceRouter)

app.use((req, res, next) => {
  if (globalVars.isDeviceConnected) {
    return next();
  }

  res.status(404)
  res.sendFile(path.join(__dirname, 'static', '404.html'))
}, IS_PROD ? express.static(STATIC_FILES_PATH) : require('express-http-proxy')('localhost:8082'))

app.use((req, res) => {
  res.status(404)
  res.sendFile(path.join(__dirname, 'static', '404.html'))
})

const wss = new WebSocket.Server({ server });

let latestSentStr = ''
let intervalIds: any[] = []
wss.on('connection', (wsc) => {
  console.warn('new Conn')
  if (!globalVars.isDeviceConnected) {
    wsc.close()
    const ind = globalVars.activeWSConnections.findIndex((it) => it === wsc)
    globalVars.activeWSConnections.splice(ind, 1)
    clearInterval(intervalIds[ind])
    intervalIds.splice(ind, 1)
    return
  }

  globalVars.activeWSConnections.push(wsc)
  const wsMessageHandler = getWsMessageHandler(wsc)
  wsc.on('message', wsMessageHandler)

  wsc.on('close', () => {
    console.warn('close')
    const indexOfCurrentWSC = globalVars.activeWSConnections.findIndex((w) => w === wsc)
    globalVars.activeWSConnections.splice(indexOfCurrentWSC, 1)
    clearInterval(intervalIds[indexOfCurrentWSC])
    intervalIds.splice(indexOfCurrentWSC, 1)
  })

  intervalIds.push(setInterval(() => {

    const newStr = JSON.stringify(globalVars.dataToShow)
    if (latestSentStr === newStr) {
      return
    }

    wsc.send(newStr)
    latestSentStr = newStr
  }, 500))
});

server.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`)
})
