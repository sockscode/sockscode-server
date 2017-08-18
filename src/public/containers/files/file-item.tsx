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
import { fade } from 'material-ui/utils/colorManipulator';
import { FileListState, File, FileId } from '../../reducers/file-list'
import fileListActions from '../../actions/file-list-actions'
import { FileIcon } from '../../components/files/file-icon';
const styles = require("./file-item.css");

const SelectableList = makeSelectable(List);

interface FileItemReduxProps {
    file?: File;
    onExpandCollapse?: (fileId: FileId) => void;
    onFileOpen?: (fileId: FileId) => void;    
}

interface FileItemProps extends FileItemReduxProps {
    fileId: FileId;
    parentFileId: FileId;
}

interface FileItemState {
}

@CSSModules(styles)
class FileItem extends React.Component<FileItemProps, FileItemState>{
    static contextTypes = {
        muiTheme: React.PropTypes.object.isRequired,
    };

    render() {
        const { onExpandCollapse, onFileOpen, fileId, file, parentFileId, ...other } = this.props;
        const style = {} as { backgroundColor: string };
        if (file.isSelected) {
            const textColor = this.context.muiTheme.baseTheme.palette.textColor;
            style.backgroundColor = fade(textColor, 0.2);
        }
        return <ListItem
            style={style}
            key={fileId}
            value={fileId}
            primaryText={file.filename}
            leftIcon={<FileIcon file={file} />}
            open={file.isExpanded}
            onClick={() => { if (file.isDirectory) { onExpandCollapse(fileId) } else { onFileOpen(fileId) } }}
            onNestedListToggle={() => { onExpandCollapse(fileId) }}
            nestedItems={(file.children || []).map((fileChildId) => {
                return <FileItemConnected key={fileChildId} fileId={fileChildId} parentFileId={fileId} />
            })}
            {...other}
        />
    }
}


const mapStateToProps = (state: SockscodeState, props: FileItemProps): FileItemReduxProps => {
    return { file: state.fileList.files.get(props.fileId) };
}

const mapDispatchToProps = (dispatch: Dispatch<{}>): FileItemReduxProps => {
    return {
        onExpandCollapse: (fileId: FileId) => {
            dispatch(fileListActions.expandCollapse(fileId));
            dispatch(fileListActions.selectFile(fileId));
        },
        onFileOpen: (fileId: FileId) => {
            dispatch(fileListActions.openFile(fileId));
            dispatch(fileListActions.selectFile(fileId));
        }
    }
}

const FileItemConnected = connect(
    mapStateToProps,
    mapDispatchToProps
)(FileItem);

export default FileItemConnected;
