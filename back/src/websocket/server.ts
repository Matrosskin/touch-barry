import type http from 'http'
import WebSocket from 'ws'
import globalVars from '../../global-vars';
import { getWsMessageHandler } from '.';

export function initWsServer(httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) {
  const wss = new WebSocket.Server({ server: httpServer });

  wss.on('connection', (wsc) => {
    if (!globalVars.isDeviceConnected) {
      wsc.close()
      const ind = globalVars.activeWSConnections.findIndex((it) => it === wsc)
      globalVars.activeWSConnections.splice(ind, 1)
      return
    }

    globalVars.activeWSConnections.push(wsc)
    const wsMessageHandler = getWsMessageHandler(wsc)
    wsc.on('message', wsMessageHandler)

    wsc.on('close', () => {
      const indexOfCurrentWSC = globalVars.activeWSConnections.findIndex((w) => w === wsc)
      globalVars.activeWSConnections.splice(indexOfCurrentWSC, 1)
    })
  })
}
