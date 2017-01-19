import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SockscodeState } from '../../reducers/Reducers';
import { codeChanged } from '../../actions/Actions'
import { MonacoEditor } from '../../components/editor/MonacoEditor';


const mapStateToProps = (state: SockscodeState) => {
    return { code: state.code };
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