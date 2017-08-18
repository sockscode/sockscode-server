import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SockscodeState } from '../../reducers/reducers';
import { codeChanged } from '../../actions/actions';
import { Toolbar } from '../../components/toolbar/toolbar';
import { createRoom, changedRoom, joinRoom } from '../../actions/actions';

const mapStateToProps = (state: SockscodeState) => {
    const { roomUuid } = state;
    return { roomUuid };
}

const mapDispatchToProps = (dispatch: Dispatch<{}>) => {
    return {
        onCreateNewRoom: () => {
            dispatch(createRoom());
        },
        onRoomChange: (roomUuid: string) => {
            dispatch(changedRoom(roomUuid));
        },
        onConnect: (roomUuid: string) => {
            dispatch(joinRoom(roomUuid));
        }
    }
}
const SockscodeToolbar = connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar);

export { SockscodeToolbar }