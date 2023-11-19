import { Socket } from 'socket.io-client'

declare module 'vue' {
  interface ComponentCustomProperties {
    $socket?: Socket;
  }
}
