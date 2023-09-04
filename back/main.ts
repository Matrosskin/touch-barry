import express from 'express'
import http from 'http'
import { monitorBattery } from './src/collect-data/battery'
import { monitorCpuUsage } from './src/cpu'
import { startClientUpdater } from './src/client-updater'
import { initWsServer } from './src/websocket/server'
import { configureExpressApp } from './src/expressjs/configure-express-app'
import { startNgrokTunnel } from './src/ngrok'

const app = express()
const server = http.createServer(app)

// TODO: Need to add additional ws server to be able to show actual "online" status in machine list.
initWsServer(server)

configureExpressApp(app)

const port = 8080
const host = '127.0.0.1'

server.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`)

  startNgrokTunnel()

  monitorCpuUsage()
  monitorBattery()
  startClientUpdater()
})
