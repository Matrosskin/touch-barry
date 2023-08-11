import { WebSocket } from 'ws';
import globalVars from '../global-vars';
import { WsMessageType } from '@common/constants/ws-message-type';

export function sendDataUpdate() {
  globalVars.activeWSConnections.forEach((ws: WebSocket) => {
    ws.send(JSON.stringify({
      messageType: WsMessageType.DATA_UPDATE,
      data: globalVars.dataToShow
    }))
  })
}
