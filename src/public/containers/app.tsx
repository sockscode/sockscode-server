import * as React from 'react'
import CSSModules from 'react-css-modules';
import CodeEditor from './editor/code-editor';
import { SockscodeToolbar } from './toolbar/sockscode-toolbar';
import FileList from './files/file-list';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { sockscodeApp } from '../reducers/reducers';
import { SocketIoCodeService } from '../service/socket-io-code-service';
import { createdRoom, codeChanged, remoteCodeChanged } from '../actions/actions'
// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

interface AppProps {

}

interface AppState {

}

const store = createStore(sockscodeApp);
const styles = require("./app.css");
const socketIoCodeService = SocketIoCodeService.instance;
socketIoCodeService.onCreateRoom((roomUuid) => {
    store.dispatch(createdRoom(roomUuid));
});
socketIoCodeService.onCodeChange((codeChangeSocketData) => {
    store.dispatch(remoteCodeChanged(codeChangeSocketData.code));
});

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