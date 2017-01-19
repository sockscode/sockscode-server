import * as socketio from 'socket.io-client';

export interface CodeChangeSocketData {
    username: string,
    code: string
}

export class SocketIoCodeService {
    private static _instance: SocketIoCodeService = null;

    public static get instance(): SocketIoCodeService {
        if (!this._instance) {
            this._instance = new SocketIoCodeService();
        }
        return this._instance;
    }

    private _io: typeof socketio.Socket;

    constructor() {
        this._io = socketio.connect({ path: '/code' });
    }

    changeCode(code: string) {
        this._io.emit('code change', code);
    }

    createRoom() {
        this._io.emit('create room');
    }

    joinRoom(roomUuid: string) {
        this._io.emit('join room', roomUuid);
    }

    onCodeChange(codeChangeFunc: (data: CodeChangeSocketData) => void) {
        this._io.on('code change', (data: CodeChangeSocketData) => {
            codeChangeFunc(data);
        });
    }

    onCreateRoom(roomCreatedFunc: (roomUuid: string) => void) {
        this._io.on('create room', (roomUuid: string) => {
            roomCreatedFunc(roomUuid);
        })
    }

    onConnection(onConnectionFunc: (socket: typeof socketio.Socket) => void, onDisconnectFunc: (socket: typeof socketio.Socket) => void) {
        this._io.on('connection', (socket: typeof socketio.Socket) => {
            onConnectionFunc(socket);
            socket.on('disconnect', () => {
                onDisconnectFunc(socket);
            });
        });
    }
}