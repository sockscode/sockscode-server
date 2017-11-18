import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SockscodeState } from '../../reducers/reducers';
import { Header } from '../../components/editor/header';
import { getFullNamesPath } from '../../reducers/file-list';

const mapStateToProps = (state: SockscodeState) => {
    const { open } = state.fileList;
    if (open) {
        const file = state.fileList.files.get(open);
        return { file: file, filePath: file ? getFullNamesPath(state.fileList, open) : [] };
    }

    return { file: null, filePath: [] };
}

const mapDispatchToProps = (_dispatch: Dispatch<{}>) => {
    return {
    };
}

const HeaderConnected = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

export default HeaderConnected