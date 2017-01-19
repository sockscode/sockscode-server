import { CreatedRoomAction, CreateRoomAction, ChangedRoomAction, CREATE_ROOM, CHANGED_ROOM, CREATED_ROOM,  } from '../actions/Actions';

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