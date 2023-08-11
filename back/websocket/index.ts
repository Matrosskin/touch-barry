import { WebSocket } from 'ws';

export const getWsMessageHandler = (wsc: WebSocket) => (message: string) => {
    //log the received message and send it back to the client
    console.log('received: %s', message);
    wsc.send(`Hello, you sent -> ${message}`);
}
