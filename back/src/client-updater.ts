import globalVars from '../global-vars'
import { store } from './store'

export function startClientUpdater() {
  let latestSentStr = ''
  store.subscribe(() => {
    const newStr = JSON.stringify(store.getState().dataToShow)
    if (latestSentStr === newStr) {
      return
    }

    globalVars.activeWSConnections.forEach((wsc) => {
      wsc.send(newStr)
    })
    latestSentStr = newStr
  })
}
