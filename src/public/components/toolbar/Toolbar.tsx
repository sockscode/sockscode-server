import * as React from 'react';
import CSSModules from 'react-css-modules';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import RaisedButton from 'material-ui/RaisedButton';

const styles = require("./Toolbar.css");


interface ToolbarProps {
    onCreateNewRoom: () => void;
    onRoomChange: (roomUuid: string) => void;
    onConnect: (roomUuid: string) => void;
    roomUuid: string;
}

interface ToolbarState {
    createNewRoomWindowOpen: boolean
}

@CSSModules(styles)
export class Toolbar extends React.Component<ToolbarProps, ToolbarState>{
    state = {
        createNewRoomWindowOpen: false
    }

    constructor() {
        super();
    }

    render() {
        return <AppBar
            title={<span>Codesocs mirror</span>}
            iconElementRight={this.renderRightPanel()}
        />
    }

    processWindowTouchTap(newRoom: boolean) {
        this.props.onCreateNewRoom();
        this.setState({ createNewRoomWindowOpen: false });
    }

    onConnect() {
        this.props.onConnect(this.props.roomUuid);
    }

    renderRightPanel() {
        const actions = [
            <RaisedButton
                className={styles.button}
                label="Cancel"
                primary={true}
                onTouchTap={() => this.processWindowTouchTap(false)}
            />,
            <RaisedButton
                className={styles.button}
                label="Start new session"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => this.processWindowTouchTap(true)}
            />,
        ]
        return <div className={styles['right-panel']}>
            <TextField className={styles.button} hintText="Room uuid" value={this.props.roomUuid} onChange={(event) => this.props.onRoomChange((event.target as any as { value: string }).value)} />
            <RaisedButton disabled={!this.props.roomUuid} className={styles.button} onTouchTap={() => this.onConnect()} primary={true} label="Connect" />
            <RaisedButton className={styles.button} onTouchTap={() => this.setState({ createNewRoomWindowOpen: true })} secondary={true} label="New Session" />
            <Dialog
                title="New room"
                actions={actions}
                modal={false}
                open={this.state.createNewRoomWindowOpen}
            >
                Are you sure you want to create a new room?
            </Dialog>
        </div>;
    }
}