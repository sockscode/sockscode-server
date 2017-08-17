import { combineReducers } from 'redux'

import { roomUuid } from './Room';
import { fileList, FileListState } from './FileList';

export interface SockscodeState {
  roomUuid: string,
  fileList: FileListState
}

export const sockscodeApp = combineReducers({
  roomUuid, fileList
});