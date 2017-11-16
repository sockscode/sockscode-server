import { combineReducers } from 'redux'

import { roomState, IRoomState } from './room';
import { fileList, FileListState } from './file-list';

export interface SockscodeState {
  roomState: IRoomState,
  fileList: FileListState
}

export const sockscodeApp = combineReducers({
  roomState, fileList
});