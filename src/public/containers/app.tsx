import * as React from 'react'
import CSSModules from 'react-css-modules';
import CodeEditor from './editor/code-editor';
import { SockscodeToolbar } from './toolbar/sockscode-toolbar';
import FileList from './files/file-list';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { sockscodeApp, SockscodeState} from '../reducers/reducers';
import { getFullNamesPath, findFileByFullNamesPath } from '../reducers/file-list';
import { SocketIoCodeService } from '../service/socket-io-code-service';
import {
    createdRoom, remoteCodeChanged, joinedRoom, loadFilesStructure, CodeChangedLocalAction, JoinRoomAction,
    CreateRoomAction, CODE_CHANGED_LOCAL, JOIN_ROOM, CREATE_ROOM,
} from '../actions/actions'
// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

interface AppProps { }

interface AppState { }

//#region sockscode server

const socketIoCodeService = SocketIoCodeService.instance;
const store = createStore<SockscodeState>(sockscodeApp as any, void 0, applyMiddleware(function sockscodeMiddleware({ getState }) {
    return next => (action) => {
        const a = (action as any as (CodeChangedLocalAction | JoinRoomAction | CreateRoomAction));
        if (a.type === CODE_CHANGED_LOCAL) {
            const state: SockscodeState = getState() as any;
            socketIoCodeService.changeCode({ code: a.code, filePath: getFullNamesPath(state.fileList, a.fileId) });
        } else if (a.type === JOIN_ROOM) {
            SocketIoCodeService.instance.joinRoom(a.roomUuid);
        } else if (a.type === CREATE_ROOM) {
            SocketIoCodeService.instance.createRoom();
        }
        return next(action);
    }
}));
const styles = require("./app.css");
socketIoCodeService.onCreateRoom((roomUuid) => {
    store.dispatch(createdRoom(roomUuid));
});
socketIoCodeService.onCodeChange((codeChangeSocketData) => {
    const fileId = findFileByFullNamesPath(store.getState().fileList, codeChangeSocketData.change.filePath);
    if (fileId) {
        store.dispatch(remoteCodeChanged(codeChangeSocketData.change.code, fileId));
    }
});
socketIoCodeService.onJoinedRoom((roomUuid) => {
    store.dispatch(joinedRoom(roomUuid));
    socketIoCodeService.requestFilesStructure();
});
socketIoCodeService.onFilesStructureRequest(() => {
    //fixme send files structure
    //store.getState().fileList
});
socketIoCodeService.onFilesStructure((files) => {
    store.dispatch(loadFilesStructure(files));
});
store.subscribe(()=>{
    
})

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
                            <CodeEditor />
                        </div>
                    </div>
                </div>
            </Provider>
        </MuiThemeProvider>
    }
}