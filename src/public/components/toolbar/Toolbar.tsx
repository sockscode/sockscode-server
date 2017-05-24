import * as React from 'react';
import CSSModules from 'react-css-modules';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
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
            title={<span>Sockscode mirror</span>}
            iconElementLeft={<IconButton><SvgIcon className={styles.logo} viewBox="0 0 200 200">
                <defs>
                    <pattern id="sock" x="0" y="0" width="90" height="30" patternUnits="userSpaceOnUse">
                        <rect width="90" height="30" fill="#F35325"></rect>
                        <rect width="90" height="18" fill="#81BC06"></rect>
                    </pattern>
                    <pattern id="sockRotated" x="0" y="0" width="90" height="30" patternUnits="userSpaceOnUse">
                        <rect width="90" height="30" fill="#05A6F0"></rect>
                        <rect width="90" height="18" fill="#FFBA08"></rect>
                    </pattern>
                </defs>
                <circle cx="100" cy="100" r="98" stroke="black" fill="white" strokeWidth="0"></circle>
                <g transform="translate(44,23)">
                    <g>
                        <path d="M 0 0 L 46 0 L 46 85 L 85.23138726188375 102.50323431684045 A 23 23 0 0 1 94.54367554580823 136.9213090611957 L 94.15441245192645 137.4634969419596 A 23 23 0 0 1 65.6897146442473 144.8662514593451 L 11.494563534719532 119.40105997414531 A 20 20 0 0 1 0 101.29974647111253 Z" style={{ fill: 'url(#sock)' }} strokeWidth="0"></path>
                    </g>
                    <g transform="rotate(180,56,77)">
                        <path d="M 0 0 L 46 0 L 46 85 L 85.23138726188375 102.50323431684045 A 23 23 0 0 1 94.54367554580823 136.9213090611957 L 94.15441245192645 137.4634969419596 A 23 23 0 0 1 65.6897146442473 144.8662514593451 L 11.494563534719532 119.40105997414531 A 20 20 0 0 1 0 101.29974647111253 Z" style={{ fill: 'url(#sockRotated)' }} strokeWidth="0"></path>
                    </g>
                </g>
            </SvgIcon></IconButton>}
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