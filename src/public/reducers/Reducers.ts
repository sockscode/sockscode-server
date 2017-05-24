import { combineReducers } from 'redux'

import { code } from './Code';
import { roomUuid } from './Room';
import { fileList, FileListState } from './FileList';

export interface SockscodeState {
  code: string,
  roomUuid: string,
  fileList: FileListState
}

export const sockscodeApp = combineReducers({
  code, roomUuid, fileList
});