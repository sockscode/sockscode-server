import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SockscodeState } from '../../reducers/reducers';
import { expandCollapse } from '../../actions/file-list-actions'
import { FileList as FileListComponent } from '../../components/files/file-list';
import { File } from '../../reducers/file-list'


const mapStateToProps = (state: SockscodeState) => {
    return { rootFile: state.fileList.files.get(0), selectedFile: state.fileList.files.get(state.fileList.open) };
}

const mapDispatchToProps = (dispatch: Dispatch<{}>) => {    
    return {};
}

const FileList = connect(
    mapStateToProps,
    mapDispatchToProps
)(FileListComponent);

export default FileList