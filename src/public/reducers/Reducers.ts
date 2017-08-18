import { combineReducers } from 'redux'

import { roomUuid } from './room';
import { fileList, FileListState } from './file-list';

export interface SockscodeState {
  roomUuid: string,
  fileList: FileListState
}

export const sockscodeApp = combineReducers({
  roomUuid, fileList
});