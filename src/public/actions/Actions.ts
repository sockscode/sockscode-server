import { Dispatch } from 'redux';
import { SocketIoCodeService } from '../service/SocketIoCodeService';
/*
 * action types
 */
export const CREATE_ROOM = 'CREATE_ROOM';
export const CREATED_ROOM = 'CREATED_ROOM';
export const CHANGED_ROOM = 'CHANGED_ROOM';
export const JOIN_ROOM = 'JOIN_ROOM';
export const CODE_CHANGED_REMOTE = 'CODE_CHANGED_REMOTE';
export const CODE_CHANGED_LOCAL = 'CODE_CHANGED_LOCAL';

interface HasRoomUuid {
    roomUuid: string;
}

interface HasCode {
    code: string;
}

export interface CreateRoomAction {
    type: 'CREATE_ROOM';
}
export interface ChangedRoomAction extends HasRoomUuid {
    type: 'CHANGED_ROOM';
}
export interface CreatedRoomAction extends HasRoomUuid {
    type: 'CREATED_ROOM';
}
export interface JoinRoomAction extends HasRoomUuid {
    type: 'JOIN_ROOM';
}

export interface CodeChangedLocalAction extends HasCode {
    type: 'CODE_CHANGED_LOCAL';
}
export interface CodeChangedRemoteAction extends HasCode {
    type: 'CODE_CHANGED_REMOTE';
}
/*
 * action creators
 */
export function createRoom(): CreateRoomAction {
    SocketIoCodeService.instance.createRoom();
    return { type: CREATE_ROOM }
}

export function joinRoom(roomUuid: string): JoinRoomAction {
    SocketIoCodeService.instance.joinRoom(roomUuid);
    return { type: JOIN_ROOM, roomUuid };
}

export function createdRoom(roomUuid: string): CreatedRoomAction {
    return { type: CREATED_ROOM, roomUuid }
}

export function changedRoom(roomUuid: string): ChangedRoomAction {
    return { type: CHANGED_ROOM, roomUuid };
}

export function codeChanged(code: string): CodeChangedLocalAction {
    SocketIoCodeService.instance.changeCode(code);
    return { type: CODE_CHANGED_LOCAL, code };
}

export function remoteCodeChanged(code: string): CodeChangedRemoteAction {
    return { type: CODE_CHANGED_REMOTE, code };
}

