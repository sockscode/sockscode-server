import { CodeChangedLocalAction, CodeChangedRemoteAction, CODE_CHANGED_LOCAL, CODE_CHANGED_REMOTE } from '../actions/Actions';


const reducer = (state = '', action: CodeChangedLocalAction | CodeChangedRemoteAction) => {
    console.log(action);
    switch (action.type) {
        case CODE_CHANGED_LOCAL: case CODE_CHANGED_REMOTE:
            return action.code;
        default:
            return state
    }
}

export const code = reducer;