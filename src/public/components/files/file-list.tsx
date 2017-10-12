import * as React from 'react';
import CSSModules from 'react-css-modules';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
import CreateNewFolder from 'material-ui/svg-icons/file/create-new-folder';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import { FileListState, File, FileId } from '../../reducers/file-list'
import FileItem from '../../containers/files/file-item'
import { FileIcon } from './file-icon';
const styles = require("./file-list.css");

const SelectableList = makeSelectable(List);

export interface FileListReduxProps {
    rootFile?: File,
    selectedFile?: File
    onCreateNewFile?: (isDirectory: boolean) => void;
}

interface FilesListProps extends FileListReduxProps {
}

interface FilesListState {
}

@CSSModules(styles)
export class FileList extends React.Component<FilesListProps, FilesListState>{

    render() {
        return <div className={styles.container}>
            <Subheader>
                <div className={styles['project-header']}>
                    <div className={styles['project-header-title']}>Project</div>
                    <div className={styles['project-header-buttons']}>
                        <IconButton tooltip="New file" tooltipPosition="bottom-left" onClick={() => { this.props.onCreateNewFile(false) }}>
                            <NoteAdd />
                        </IconButton>
                        <IconButton tooltip="New folder" tooltipPosition="bottom-left" onClick={() => { this.props.onCreateNewFile(true) }}>
                            <CreateNewFolder />
                        </IconButton>
                    </div>
                </div>
            </Subheader>
            <div className={styles['project-files']}>
                <SelectableList value={0} onChange={(...args: any[]) => { console.log(args) }}>
                    {this.renderFileList()}
                </SelectableList>
            </div>
        </div>
    }

    renderFileList() {
        const { rootFile } = this.props;
        const renderFile = (fileId: FileId): JSX.Element => {
            return <FileItem key={fileId} fileId={fileId} parentFileId={rootFile.id} />;
        }

        return rootFile.children.map(renderFile);
    }
}
