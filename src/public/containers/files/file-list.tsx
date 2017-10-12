import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SockscodeState } from '../../reducers/reducers';
import { expandCollapse, createFile } from '../../actions/file-list-actions'
import { FileList as FileListComponent, FileListReduxProps } from '../../components/files/file-list';
import { File } from '../../reducers/file-list'

const mapStateToProps = (state: SockscodeState): FileListReduxProps => {
    return { rootFile: state.fileList.files.get(0), selectedFile: state.fileList.files.get(state.fileList.open) };
}

const mapDispatchToProps = (dispatch: Dispatch<{}>): FileListReduxProps => {
    return {
        onCreateNewFile: (isDirectory: boolean) => {
            dispatch(createFile(isDirectory));
        }
    };
}

const FileList = connect(
    mapStateToProps,
    mapDispatchToProps
)(FileListComponent);

export default FileList