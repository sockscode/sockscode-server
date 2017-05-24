import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SockscodeState } from '../../reducers/Reducers';
import { codeChanged } from '../../actions/Actions'
import { FileList as FileListComponent } from '../../components/files/FileList';


const mapStateToProps = (state: SockscodeState) => {
    return { fileList: state.fileList };
}

const mapDispatchToProps = (dispatch: Dispatch<{}>) => {
    return {
        //onCodeChange: (code: string) => {
        //    dispatch(codeChanged(code));
        //}
    }
}

const FileList = connect(
    mapStateToProps,
    mapDispatchToProps
)(FileListComponent);

export default FileList