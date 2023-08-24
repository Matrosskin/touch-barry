import express from 'express'
import http from 'http'
import { monitorBattery } from './src/collect-data/battery'
import { monitorCpuUsage } from './src/cpu'
import { startClientUpdater } from './src/client-updater'
import { initWsServer } from './src/websocket/server'
import { configureExpressApp } from './src/expressjs/configure-express-app'

const app = express()
const server = http.createServer(app)

initWsServer(server)

configureExpressApp(app)

const port = 8080
const host = '127.0.0.1'

server.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`)

  monitorCpuUsage()
  monitorBattery()
  startClientUpdater()
})
