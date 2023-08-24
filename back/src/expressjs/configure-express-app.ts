import express from 'express'
import path from 'path'
import globalVars from '../../global-vars'
import { apiRouter } from './routes/api'
import { deviceRouter } from'./routes/device'

export function configureExpressApp(app: ReturnType<typeof express>) {
    // TODO: Need to work on this logic more. Initially it was implemented, but after a few side changes it became not fully correct.
    // Also, when will be a time to prepare distributable package - path will be changed.
  const STATIC_FILES_PATH = path.join(__dirname, '..', '..', '..', 'front', 'build')

  const IS_PROD = process.env.NODE_ENV === 'production'

  app.use('/device', deviceRouter)
  app.use('/api', apiRouter) // TODO: This route should be secured!!!

  app.use((req, res, next) => {
    if (globalVars.isDeviceConnected) {
      return next();
    }

    res.status(404)
    // TODO: Need to work on this logic more. Initially it was implemented, but after a few side changes it even looks broken.
    res.sendFile(path.join(__dirname, 'static', '404.html'))
  }, IS_PROD ? express.static(STATIC_FILES_PATH) : require('express-http-proxy')('localhost:8082'))

  app.use((req, res) => {
    res.status(404)
    res.sendFile(path.join(__dirname, 'static', '404.html'))
  })
}
