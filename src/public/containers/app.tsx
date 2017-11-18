import * as React from 'react'
import CSSModules from 'react-css-modules';
import CodeEditor from './editor/code-editor';
import CodeHeader from './editor/header';
import { SockscodeToolbar } from './toolbar/sockscode-toolbar';
import FileList from './files/file-list';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { sockscodeApp, SockscodeState } from '../reducers/reducers';
import { getFullNamesPath, findFileByFullNamesPath, mapFilesToTreeFiles } from '../reducers/file-list';
import { SocketIoCodeService } from '../service/socket-io-code-service';
import {
    createdRoom, remoteCodeChanged, joinedRoom, loadFilesStructure, CodeChangedLocalAction, JoinRoomAction,
    CreateRoomAction, CODE_CHANGED_LOCAL, JOIN_ROOM, CREATE_ROOM,
} from '../actions/actions';
import { OpenFileAction, OPEN_FILE } from '../actions/file-list-actions'
// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

interface AppProps { }

interface AppState { }

//fixme move it from here
//#region sockscode server

let isMaster = false; //fixme move to redux state
const socketIoCodeService = new SocketIoCodeService(); //fixme create only when trully needed //fixme move to redux state?
const store = createStore<SockscodeState>(sockscodeApp as any, void 0, applyMiddleware(function sockscodeMiddleware({ getState }) {
    return next => (action) => {
        const a = (action as any as (CodeChangedLocalAction | JoinRoomAction | CreateRoomAction | OpenFileAction));
        const state: SockscodeState = getState() as any;
        if (a.type === CODE_CHANGED_LOCAL) {
            if (isMaster || state.fileList.files.get(a.fileId).loaded) {
                socketIoCodeService.changeCode({ code: a.code, filePath: getFullNamesPath(state.fileList, a.fileId) });
            }
        } else if (a.type === JOIN_ROOM) {
            socketIoCodeService.joinRoom(a.roomUuid);
        } else if (a.type === CREATE_ROOM) {
            socketIoCodeService.createRoom();
        } else if (a.type === OPEN_FILE) {
            if (!isMaster && !state.fileList.files.get(a.fileId).loaded) {
                socketIoCodeService.loadFile({ filePath: getFullNamesPath(state.fileList, a.fileId) });
            }
        }
        return next(action);
    }
}));
const styles = require("./app.css");
socketIoCodeService.onCreateRoom((roomUuid) => {
    store.dispatch(createdRoom(roomUuid));
});
socketIoCodeService.onCodeChange((codeChangeSocketData) => {
    store.dispatch(remoteCodeChanged(codeChangeSocketData.change.code, codeChangeSocketData.change.filePath));
});
socketIoCodeService.onLoadFile((loadFileData) => {
    const { fileList } = store.getState();
    const { filePath } = loadFileData;
    const fileId = findFileByFullNamesPath(fileList, loadFileData.filePath).fileId;
    const file = fileList.files.get(fileId);
    if (isMaster && file) {
        socketIoCodeService.changeCode({ code: file.content, filePath: filePath });
    }
});
socketIoCodeService.onJoinedRoom((roomUuid) => {
    isMaster = false;
    store.dispatch(joinedRoom(roomUuid));
    socketIoCodeService.requestFilesStructure();
});
socketIoCodeService.onCreateRoom((roomUuid) => {
    isMaster = true;
    store.dispatch(joinedRoom(roomUuid));
});
socketIoCodeService.onFilesStructureRequest(() => {
    if (isMaster) {
        socketIoCodeService.sendFilesStructure(mapFilesToTreeFiles(store.getState().fileList));
    }
    //fixme send files structure
    //store.getState().fileList
});
socketIoCodeService.onFilesStructure((files) => {
    store.dispatch(loadFilesStructure(files, true));
});

//#endregion sockscode 

@CSSModules(styles)
export class App extends React.Component<AppProps, AppState>{
    constructor() {
        super();
    }

    render() {
        return <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <Provider store={store}>
                <div className={styles.container}>
                    <div>
                        <SockscodeToolbar />
                    </div>
                    <div className={styles['bottom-container']}>
                        <div className={styles['file-list']}>
                            <FileList />
                        </div>
                        <div className={styles.editor}>
                            <CodeHeader />
                            <CodeEditor />
                        </div>
                    </div>
                </div>
            </Provider>
        </MuiThemeProvider>
    }
}