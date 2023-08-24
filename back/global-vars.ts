import type { WebSocket } from 'ws'

const globalVars: {
  isDeviceConnected: boolean
  activeWSConnections: WebSocket[]
  isNgrokEnabled: boolean
} = {
  isDeviceConnected: true,
  activeWSConnections: [],
  isNgrokEnabled: false,
}

export default globalVars
