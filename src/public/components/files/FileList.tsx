import * as React from 'react';
import CSSModules from 'react-css-modules';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import SvgIcon from 'material-ui/SvgIcon';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import { FileListState, File, FileId } from '../../reducers/FileList'
import FileItem from '../../containers/files/FileItem'
import { FileIcon } from './FileIcon';
const styles = require("./FileList.css");

const SelectableList = makeSelectable(List);

interface FileListReduxProps {
    rootFile: File
}

interface FilesListProps extends FileListReduxProps {
}

interface FilesListState {
}

@CSSModules(styles)
export class FileList extends React.Component<FilesListProps, FilesListState>{

    render() {
        return <div className={styles.container}>
            <SelectableList value={0} onChange={(...args: any[]) => { console.log(args) }}>
                <Subheader>Project</Subheader>
                {this.renderFileList()}
            </SelectableList>
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
