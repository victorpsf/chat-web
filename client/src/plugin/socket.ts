import { App } from 'vue'
import io, { Socket } from 'socket.io-client'

export interface ISocketPropertie {
    $socket: Socket;
}

const connection = function (vue: App) {
    try {
        const socket = io('http://localhost:3000', { 
            path: '/skt',
            autoConnect: true
        });

        vue.config.globalProperties.$socket = socket;
    }

    catch (error) {
        console.error(error);
    }
}

export default {
    install: function (vue: App) {
        connection(vue);
    }
}