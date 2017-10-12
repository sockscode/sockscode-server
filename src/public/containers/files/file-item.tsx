import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SockscodeState } from '../../reducers/reducers';
import CSSModules from 'react-css-modules';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import SvgIcon from 'material-ui/SvgIcon';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RenderToLayer from 'material-ui/internal/RenderToLayer'
import { fade } from 'material-ui/utils/colorManipulator';
import { FileListState, File, FileId } from '../../reducers/file-list'
import fileListActions from '../../actions/file-list-actions'
import { FileIcon } from '../../components/files/file-icon';
import EventListener from 'react-event-listener';
const styles = require("./file-item.css");

const SelectableList = makeSelectable(List);

interface FileItemReduxProps {
    file?: File;
    onExpandCollapse?: (fileId: FileId, parentFileId: FileId) => void;
    onFileOpen?: (fileId: FileId, parentFileId: FileId) => void;
    onFileRename?: (fileId: FileId, filename: string) => void;
    onSetIsRenaming?: (fileId: FileId, isRenaming: boolean) => void;
    onRemoveFile?: (fileId: FileId, parentFileId: FileId) => void;
}

interface FileItemProps extends FileItemReduxProps {
    fileId: FileId;
    parentFileId: FileId;
}

interface FileItemState {
    contextMenuOpen: boolean,
    contextMenuPosition: { top: number, left: number }
    contextMenuAnchorEl: any,
    renamingValue: string,
    renamingErrorText?: string
}

/**
 * RenderToLayer that adds contextmenu event to renderLayer and unrenderLayer methods
 */
const RenderToLayerWithContextMenu = class extends RenderToLayer {
    constructor(props?: any, context?: any) {
        super(props, context);

        const me = this as any as { onClickAway: () => void; renderLayer: () => void; unrenderLayer: () => void; layer: any; props: { open: any, useLayerForClickAway: any } }
        const { renderLayer, unrenderLayer } = me;
        me.renderLayer = () => {
            const { layer } = me;
            const { open, useLayerForClickAway } = me.props;

            renderLayer.call(this);
            if (open) {
                if (!layer) {
                    if (useLayerForClickAway) {
                        me.layer.addEventListener('contextmenu', me.onClickAway);
                    } else {
                        setTimeout(() => {
                            window.addEventListener('contextmenu', me.onClickAway);
                        }, 0);
                    }
                }
            }
        }

        me.unrenderLayer = () => {
            if (!me.layer) {
                return;
            }
            const { layer } = me;
            const { open, useLayerForClickAway } = me.props;

            unrenderLayer.call(this);
            if (useLayerForClickAway) {
                layer.removeEventListener('contextmenu', me.onClickAway);
            } else {
                window.removeEventListener('contextmenu', me.onClickAway);
            }
        }
    }
}

@CSSModules(styles)
class FileItem extends React.Component<FileItemProps, FileItemState>{
    static contextTypes = {
        muiTheme: React.PropTypes.object.isRequired,
        store: React.PropTypes.object.isRequired
    };

    private PositionedPopover: typeof Popover = null;

    constructor(props?: FileItemProps, context?: any) {
        super(props, context);

        this.state = { contextMenuOpen: false, contextMenuAnchorEl: null, contextMenuPosition: null, renamingValue: null, renamingErrorText: null };
        this.onContextMenu = this.onContextMenu.bind(this);
        this.onContextMenuClose = this.onContextMenuClose.bind(this);
        this.onRenameMenuClick = this.onRenameMenuClick.bind(this);
        this.onDeleteMenuClick = this.onDeleteMenuClick.bind(this);
        this.onChangeRenamingValue = this.onChangeRenamingValue.bind(this);

        const me = this;

        /**
         * Popover with manual top,left position
         */
        this.PositionedPopover = class extends Popover {
            getAnchorPosition() {
                const { contextMenuPosition } = me.state;
                type n = number;
                const a = {
                    top: contextMenuPosition.top,
                    left: contextMenuPosition.left,
                    width: 0,
                    height: 0,
                } as { top: n, left: n, width: n, height: n, right: n, bottom: n, middle: n, center: n };

                a.right = a.right || a.left + a.width;
                a.bottom = a.bottom || a.top + a.height;
                a.middle = a.left + ((a.right - a.left) / 2);
                a.center = a.top + ((a.bottom - a.top) / 2);
                return a;
            }
            render() {
                const me = this as any;

                return (
                    <div style={styles.root}>
                        <EventListener
                            target={me.props.scrollableContainer}
                            onScroll={me.handleScroll}
                            onResize={me.handleResize}
                        />
                        <RenderToLayerWithContextMenu
                            ref={(ref) => me.popoverRefs.layer = ref}
                            open={me.state.open}
                            componentClickAway={me.componentClickAway}
                            useLayerForClickAway={me.props.useLayerForClickAway}
                            render={me.renderLayer}
                        />
                    </div>
                );
            }
        }
    }

    onContextMenu(mouseEvent: React.MouseEvent<any>) {
        mouseEvent.preventDefault();
        this.setState({ contextMenuOpen: true, contextMenuAnchorEl: mouseEvent.target, contextMenuPosition: { top: mouseEvent.clientY, left: mouseEvent.clientX } });
    }

    onContextMenuClose() {
        this.setState({ contextMenuOpen: false, contextMenuAnchorEl: null });
    }

    onRenameMenuClick() {
        const { file, fileId } = this.props;
        this.setState({ contextMenuOpen: false, contextMenuAnchorEl: null, renamingValue: file.filename });
        this.props.onSetIsRenaming(fileId, true);
    }

    onDeleteMenuClick() {
        const { fileId, parentFileId } = this.props;
        this.setState({ contextMenuOpen: false, contextMenuAnchorEl: null });
        this.props.onRemoveFile(fileId, parentFileId);
    }

    onChangeRenamingValue(e: React.FormEvent<{}>, renamingValue: string) {
        this.setState({ renamingValue });
        this.checkRenamingErrors(renamingValue);
    }

    /**
     * Tries to rename the file/directory
     * @param isEnterRename if renaming was trigered by pressing enter key
     */
    onTryRename(isEnterRename?: boolean) {
        const { renamingErrorText, renamingValue } = this.state;
        const { fileId, file, parentFileId } = this.props;

        if (file.filename === '' && (renamingValue === '' || renamingValue == null || renamingErrorText) && !isEnterRename) {
            //just remove this file was just created and no name was set after creation
            this.props.onRemoveFile(fileId, parentFileId);
            return;
        }
        if (renamingErrorText) {
            if (!isEnterRename) {                                
                this.setState({ renamingErrorText: undefined, renamingValue: undefined });
                this.props.onSetIsRenaming(fileId, false);
            }
            return;
        }
        this.setState({ renamingErrorText: undefined, renamingValue: undefined });
        this.props.onFileRename(fileId, renamingValue);
    }

    checkRenamingErrors(renamingValue: string = this.state.renamingValue) {
        const state = this.context.store.getState() as SockscodeState;
        const { parentFileId, fileId, file } = this.props;

        if (renamingValue === '') {
            this.setState({ renamingErrorText: 'A file or folder name should be provided' })
            return;
        }

        const childrenNames = state.fileList.files.get(parentFileId).children.filter(cId => cId !== fileId).map(c => state.fileList.files.get(c).filename);
        if (~childrenNames.indexOf(renamingValue)) {
            this.setState({ renamingErrorText: `A file or folder ${renamingValue} already exists at this location. Please choose a different name` });
            return;
        }
        this.setState({ renamingErrorText: undefined })
    }

    render() {
        const { onExpandCollapse, onFileOpen, fileId, file, parentFileId, ...other } = this.props;
        const { contextMenuOpen, contextMenuAnchorEl, renamingValue, renamingErrorText } = this.state;
        const { isRenaming } = file;
        const { PositionedPopover } = this;
        const style = {} as { backgroundColor: string };
        if (file.isSelected) {
            const textColor = this.context.muiTheme.baseTheme.palette.textColor;
            style.backgroundColor = fade(textColor, 0.2);
        }
        const primaryText = isRenaming ? <TextField id={`rename-file-input${fileId}`} key={fileId} className={styles['list-item-input']} value={renamingValue} onKeyDown={(event) => {
            if (event.key === 'Enter') {
                this.onTryRename(true);
                event.preventDefault();
                event.stopPropagation();
            }
        }} onChange={this.onChangeRenamingValue} ref={
            (textField: TextField) => {
                setTimeout(() => {
                    textField && textField.focus();
                }, 10)
            }
        } onBlur={() => {
            this.onTryRename();
        }} errorText={renamingErrorText || void 0} errorStyle={{ bottom: '-9px' }} /> : file.filename;
        return <ListItem
            style={style}
            key={fileId}
            primaryText={primaryText}
            leftIcon={<FileIcon file={file} />}
            open={file.isExpanded}
            onClick={() => { if (file.isDirectory) { onExpandCollapse(fileId, parentFileId) } else { onFileOpen(fileId, parentFileId) } }}
            onContextMenu={this.onContextMenu}
            onNestedListToggle={() => { onExpandCollapse(fileId, parentFileId) }}
            nestedItems={(file.children || []).map((fileChildId) => {
                return <FileItemConnected key={fileChildId} fileId={fileChildId} parentFileId={fileId} />
            })}
            {...other}
        >
            <PositionedPopover
                open={contextMenuOpen}
                anchorEl={contextMenuAnchorEl}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                onRequestClose={this.onContextMenuClose}
            >
                <Menu>
                    <MenuItem primaryText="Rename" onClick={this.onRenameMenuClick} />
                    <MenuItem primaryText="Delete" onClick={this.onDeleteMenuClick} />
                </Menu>
            </PositionedPopover>
        </ListItem>
    }
}

const mapStateToProps = (state: SockscodeState, props: FileItemProps): FileItemReduxProps => {
    return { file: state.fileList.files.get(props.fileId) };
}

const mapDispatchToProps = (dispatch: Dispatch<{}>): FileItemReduxProps => {
    return {
        onExpandCollapse: (fileId: FileId, parentFileId: FileId) => {
            dispatch(fileListActions.expandCollapse(fileId));
            dispatch(fileListActions.selectFile(fileId, parentFileId));
        },
        onFileOpen: (fileId: FileId, parentFileId: FileId) => {
            dispatch(fileListActions.openFile(fileId));
            dispatch(fileListActions.selectFile(fileId, parentFileId));
        },
        onFileRename: (fileId: FileId, filename: string) => {
            dispatch(fileListActions.renameFile(fileId, filename))
        },
        onSetIsRenaming: (fileId: FileId, isRenaming: boolean) => {
            dispatch(fileListActions.setRenamingFile(fileId, isRenaming))
        },
        onRemoveFile: (fileId: FileId, parentFileId: FileId) => {
            dispatch(fileListActions.removeFile(fileId, parentFileId));
        }
    }
}

const FileItemConnected = connect(
    mapStateToProps,
    mapDispatchToProps
)(FileItem);

export default FileItemConnected;