import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SockscodeState } from '../../reducers/reducers';
import { codeChanged } from '../../actions/actions'
import { MonacoEditor, detectMonacoLanguage } from '../../components/editor/monaco-editor';

const mapStateToProps = (state: SockscodeState) => {
    const { open } = state.fileList;
    if (open) {
        const file = state.fileList.files.get(open);
        return { code: file.content, language: detectMonacoLanguage(file), fileId: open };
    }

    return { code: '', fileId: null as number | null };
}

const mapDispatchToProps = (dispatch: Dispatch<{}>) => {
    return {
        onCodeChange: (code: string, fileId: number) => {
            dispatch(codeChanged(code, fileId));
        }
    }
}

const CodeEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(MonacoEditor);

export default CodeEditor