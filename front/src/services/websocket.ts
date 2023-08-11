import { setDataToShow } from "../slices/dataToShow";
import { setWSStatusClosed, setWSStatusOpen, setWSStatusWaiting } from '../slices/websocket-status';
import { store } from '../store';

const wsc = new WebSocket('ws://localhost:8080');
store.dispatch(setWSStatusWaiting())

let isWSReady = false;

wsc.onerror = (event) => {
  store.dispatch(setWSStatusClosed())
  console.error('Error happens in WebSocket, here is event object:', event);
}

wsc.onclose = () => {
  store.dispatch(setWSStatusClosed())
  console.error('WebSocket connection was closed.')
}

wsc.onmessage = (event) => {
  // TODO: To think: Looks like I will use websocket only for receiving statistic data to render graphics or so.
  // It because such data should be updated periodically.
  // Other data, for instance list of TMetric tracks, should be requested if needed and delivered in response.
  // But, probably some data should be also delivered periodically... Hm, does TMetric tracks should be requested only once? )))

  store.dispatch(setDataToShow(JSON.parse(event.data)))
}

wsc.onopen = () => {
  store.dispatch(setWSStatusOpen())
}

export function sendData(data: any) {
  if (!isWSReady) {
    throw new Error('WebSocked not ready to send data.');
  }
  try {
    wsc.send(JSON.stringify(data));
  } catch (error) {
    alert('Error happens during sending of data via WebSocket');
    throw error;
  }
}
