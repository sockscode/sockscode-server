import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SockscodeState } from '../../reducers/reducers';
import { codeChanged } from '../../actions/actions'
import { MonacoEditor } from '../../components/editor/monaco-editor';


const mapStateToProps = (state: SockscodeState) => {
    const { open } = state.fileList;
    if (open) {
        const file = state.fileList.files.get(open);
        return { code: file.content };
    }

    return { code: '' };
}

const mapDispatchToProps = (dispatch: Dispatch<{}>) => {
    return {
        onCodeChange: (code: string) => {
            dispatch(codeChanged(code));
        }
    }
}

const CodeEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(MonacoEditor);

export default CodeEditor