import { CreatedRoomAction, CreateRoomAction, ChangedRoomAction, JoinedRoomAction, CHANGED_ROOM, CREATED_ROOM, JOINED_ROOM } from '../actions/actions';

export interface IRoomState {
    roomUuid?: string,
    isMaster: boolean,
    isConnected: boolean
}

const reducer = (state: IRoomState = { roomUuid: void 0, isMaster: false, isConnected: false }, action: CreatedRoomAction | CreateRoomAction | ChangedRoomAction | JoinedRoomAction) => {
    console.log(action);
    switch (action.type) {
        case CHANGED_ROOM:
            return Object.assign({}, state, { roomUuid: action.roomUuid });
        case CREATED_ROOM:
            return Object.assign({}, state, { roomUuid: action.roomUuid, isConnected: true, isMaster: true });
        case JOINED_ROOM:
            return Object.assign({}, state, { roomUuid: action.roomUuid, isConnected: true, isMaster: false });
        default:
            return state;
    }
}

export const roomState = reducer;