import ngrok from 'ngrok'
import axios from 'axios'

export async function startNgrokTunnel() {
  const url = await ngrok.connect({
    // TODO: Make the port a configurable value.
    addr: 8080,
    region: 'eu'
  })

  axios.post(
    'https://touch-barry.web.app/updateTouchBarryTunnel',
    {
      // TODO: Make the token a configurable value.
      touchBarryMachineToken: '-NdRvkLUgtBH_5AnOHGI',
      url,
    }
  )
}
