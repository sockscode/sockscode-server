import { Action } from 'redux';
import { SocketIoCodeService } from '../service/socket-io-code-service';
import { TreeFile } from '../reducers/file-list';
/*
 * action types
 */
export const CREATE_ROOM = 'CREATE_ROOM';
export const CREATED_ROOM = 'CREATED_ROOM';
export const CHANGED_ROOM = 'CHANGED_ROOM';
export const JOIN_ROOM = 'JOIN_ROOM';
export const JOINED_ROOM = 'JOINED_ROOM';
export const CODE_CHANGED_REMOTE = 'CODE_CHANGED_REMOTE';
export const CODE_CHANGED_LOCAL = 'CODE_CHANGED_LOCAL';

export const LOAD_FILES_STRUCTURE = 'LOAD_FILES_STRUCTURE';

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
export interface JoinedRoomAction extends HasRoomUuid {
    type: 'JOINED_ROOM';
}
export interface CodeChangedLocalAction extends HasCode, Action {
    type: 'CODE_CHANGED_LOCAL';
    fileId: number;
}
export interface CodeChangedRemoteAction extends HasCode, Action {
    type: 'CODE_CHANGED_REMOTE';
    fileId: number;
}
export interface LoadFilesStructureAction {
    type: 'LOAD_FILES_STRUCTURE',
    files: { children: TreeFile[] }
}
/*
 * action creators
 */
export function createRoom(): CreateRoomAction {    
    return { type: CREATE_ROOM }
}

export function joinRoom(roomUuid: string): JoinRoomAction {    
    return { type: JOIN_ROOM, roomUuid };
}

export function joinedRoom(roomUuid: string): JoinedRoomAction {
    return { type: JOINED_ROOM, roomUuid };
}

export function createdRoom(roomUuid: string): CreatedRoomAction {
    return { type: CREATED_ROOM, roomUuid }
}

export function changedRoom(roomUuid: string): ChangedRoomAction {
    return { type: CHANGED_ROOM, roomUuid };
}

export function codeChanged(code: string, fileId: number): CodeChangedLocalAction {    
    return { type: CODE_CHANGED_LOCAL, code, fileId };
}

export function remoteCodeChanged(code: string, fileId: number): CodeChangedRemoteAction {
    return { type: CODE_CHANGED_REMOTE, code, fileId };
}

export function loadFilesStructure(files: { children: TreeFile[] }): LoadFilesStructureAction {
    return { type: LOAD_FILES_STRUCTURE, files };
}

