import { Router } from 'express'
import globalVars from '../../../global-vars'

export const deviceRouter = Router()

deviceRouter.get('/connected', async (req, res) => {
  console.error('device-connected');
  if (globalVars.isNgrokEnabled) {
    // TODO: Initially I wanted to use ngrok to access the web ui from the phone,
    // but does not it will be overcomplicated? during development and testing only on local machine it is not necessary.
    const ngrok = require('ngrok')
    ngrok.connect({
      addr: 8080,
      region: 'eu'
    }).then((url: string) => {
      console.error('url', url);
    });
  }
  globalVars.isDeviceConnected = true
  res.send('OK')
})

deviceRouter.get('/disconnected', (req, res) => {
  console.error('device-disconnected')
  if (globalVars.isNgrokEnabled) {
    const ngrok = require('ngrok')
    ngrok.disconnect()
  }
  globalVars.activeWSConnections.forEach((wsc) => wsc.terminate())
  globalVars.activeWSConnections.length = 0
  globalVars.isDeviceConnected = false
  res.send('OK')
})
