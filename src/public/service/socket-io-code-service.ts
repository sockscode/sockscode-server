import * as socketio from 'socket.io-client';
import { TreeFile } from '../reducers/file-list';

export interface CodeChangeSocketData {
    username: string,
    change: CodeChangePartialSocketData
}

export interface CodeChangePartialSocketData { code: string, filePath: string[] }

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

    changeCode(change: CodeChangePartialSocketData) {
        this._io.emit('code change', change);
    }

    createRoom() {
        this._io.emit('create room');
    }

    joinRoom(roomUuid: string) {
        this._io.emit('join room', roomUuid);
    }

    sendFileCode(fileUri: string, code: string) {
        this._io.emit('file code', { fileUri, code });
    }

    sendFilesStructure(files: TreeFile[]) {
        this._io.emit('files structure', { children: files });
    }

    requestFilesStructure() {
        this._io.emit('request files structure');
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

    onJoinedRoom(roomCreatedFunc: (roomUuid: string) => void) {
        this._io.on('joined room', (roomUuid: string) => {
            roomCreatedFunc(roomUuid);
        })
    }

    onFileOpenRequest(onFileOpenRequestFun: (fileUri: string) => void) {
        this._io.on('request file code', (fileUri: string) => {
            onFileOpenRequestFun(fileUri);
        })
    }

    onFilesStructureRequest(onFilesStructureRequest: () => void) {
        this._io.on('request files structure', () => {
            onFilesStructureRequest();
        })
    }

    onFilesStructure(onFilesStructureRequest: (files: { children: TreeFile[] }) => void) {
        this._io.on('files structure', (files: { children: TreeFile[] }) => {
            onFilesStructureRequest(files);
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