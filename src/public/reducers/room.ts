import { CreatedRoomAction, CreateRoomAction, ChangedRoomAction, CHANGED_ROOM, CREATED_ROOM,  } from '../actions/actions';

const reducer = (state = '', action: CreatedRoomAction | CreateRoomAction | ChangedRoomAction) => {
    console.log(action);
    switch (action.type) {
        case CREATED_ROOM: case CHANGED_ROOM:
            return action.roomUuid;
        default:
            return state;
    }
}

export const roomUuid = reducer;