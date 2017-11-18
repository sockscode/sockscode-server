import { Action } from 'redux';
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

export interface CreateRoomAction extends Action {
    type: 'CREATE_ROOM';
}
export interface ChangedRoomAction extends HasRoomUuid, Action {
    type: 'CHANGED_ROOM';
}
export interface CreatedRoomAction extends HasRoomUuid, Action {
    type: 'CREATED_ROOM';
}
export interface JoinRoomAction extends HasRoomUuid, Action {
    type: 'JOIN_ROOM';
}
export interface JoinedRoomAction extends HasRoomUuid, Action {
    type: 'JOINED_ROOM';
}
export interface CodeChangedLocalAction extends HasCode, Action {
    type: 'CODE_CHANGED_LOCAL';
    fileId: number;
}
export interface CodeChangedRemoteAction extends HasCode, Action {
    type: 'CODE_CHANGED_REMOTE';
    filePath: string[];
}
export interface LoadFilesStructureAction extends Action {
    type: 'LOAD_FILES_STRUCTURE',
    files: { children: TreeFile[] },
    remoteFiles: boolean
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

export function remoteCodeChanged(code: string, filePath: string[]): CodeChangedRemoteAction {
    return { type: CODE_CHANGED_REMOTE, code, filePath };
}

/**
 * 
 * @param files 
 * @param remoteFiles if true this files were loaded from remote master. 
 */
export function loadFilesStructure(files: { children: TreeFile[] }, remoteFiles: true): LoadFilesStructureAction {
    return { type: LOAD_FILES_STRUCTURE, files, remoteFiles };
}



