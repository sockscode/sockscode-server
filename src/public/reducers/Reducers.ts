import { combineReducers } from 'redux'

import { code } from './Code';
import { roomUuid } from './Room';

export interface SockscodeState {
  code: string,
  roomUuid: string
};

export const sockscodeApp = combineReducers({
  code, roomUuid
});