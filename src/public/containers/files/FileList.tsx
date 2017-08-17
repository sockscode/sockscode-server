import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SockscodeState } from '../../reducers/Reducers';
import { expandCollapse } from '../../actions/FileListActions'
import { FileList as FileListComponent } from '../../components/files/FileList';
import { File } from '../../reducers/FileList'


const mapStateToProps = (state: SockscodeState) => {
    return { rootFile: state.fileList.files.get(0) };
}

const mapDispatchToProps = (dispatch: Dispatch<{}>) => {    
    return {};
}

const FileList = connect(
    mapStateToProps,
    mapDispatchToProps
)(FileListComponent);

export default FileList