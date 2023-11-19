const { Server, Socket } = require('socket.io')
const sockets = {}

const getOtherIds = function ({ id }) {
    return Object.keys(sockets).filter(a => a != id);
}

const getOtherSockets = function ({ id }) {
    return getOtherIds({ id }).map(a => sockets[a].socket);
}

const getOtherProfiles = function ({ id }) {
    return getOtherIds({ id }).map(a => sockets[a].profile);
}

const manager = async function (httpServer) {
    const io = new Server(httpServer, { 
        path: '/skt', 
        cors: {
            origin: "http://localhost:8080",
            methods: ["GET", "POST", "PUT", "DELETE"]
        }
    })

    io.on('connection', (socket) => {
        const { id } = socket

        sockets[id] = { 
            socket, 
            profile: { },
            messages: []
        };

        socket.on('profile', (data, callback) => {
            sockets[id].profile = { ...data, id, img: 'http://localhost:3000/img/user.svg' };
            callback(sockets[id].profile);

            getOtherProfiles({ id })
                .forEach(_profile => {
                    socket.emit('connected:user', _profile)
                })
            getOtherSockets({ id })
                .forEach(_socket => {
                    _socket.emit('connected:user', sockets[id].profile)
                })
        })

        socket.on('s:message', ({ from, ...values }, callback) => {
            if (sockets[from]) {
                sockets[from].socket.emit('r:message', {
                    from: id,
                    ...(values)
                })
                callback(true);
            }
        })
        
        socket.on('disconnect', () => {
            for (const _id in sockets)
                if (_id === id) continue;
                else sockets[_id].socket.emit('disconnected:user', sockets[id].profile);
            delete sockets[socket.id];
        })
    })
}

module.exports = manager