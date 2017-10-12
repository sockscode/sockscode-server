import { Dispatch } from 'redux';
import { SocketIoCodeService } from '../service/socket-io-code-service';
import { File, FileId } from '../reducers/file-list';
/*
 * action types
 */
export const EXPAND_COLLAPSE = 'EXPAND_COLLAPSE' as 'EXPAND_COLLAPSE';
export const OPEN_FILE = 'OPEN_FILE' as 'OPEN_FILE';
export const SELECT_FILE = 'SELECT_FILE' as 'SELECT_FILE';
export const RENAME_FILE = 'RENAME_FILE' as 'RENAME_FILE';
export const SET_RENAMING_FILE = 'SET_RENAMING_FILE' as 'SET_RENAMING_FILE';
export const CREATE_FILE = 'CREATE_FILE' as 'CREATE_FILE';
export const REMOVE_FILE = 'REMOVE_FILE' as 'REMOVE_FILE';

interface ActionWithFile {
    fileId: FileId
}

export interface ExpandCollapseAction extends ActionWithFile {
    type: typeof EXPAND_COLLAPSE;
}

export interface OpenFileAction extends ActionWithFile {
    type: typeof OPEN_FILE;
}

export interface SelectFileAction extends ActionWithFile {
    parentFileId: FileId;
    type: typeof SELECT_FILE;
}

export interface RenameFileAction extends ActionWithFile {
    type: typeof RENAME_FILE;
    filename: string;
}

export interface SetRenamingFileAction extends ActionWithFile {
    type: typeof SET_RENAMING_FILE;
    isRenaming: boolean;
}

export interface CreateFileAction {
    type: typeof CREATE_FILE,
    isDirectory: boolean;
}

export interface RemoveFileAction {
    type: typeof REMOVE_FILE,
    fileId: FileId,
    parentFileId: FileId
}

export type FileListActions = ExpandCollapseAction | OpenFileAction | SelectFileAction | RenameFileAction | SetRenamingFileAction | CreateFileAction | RemoveFileAction;
/*
 * action creators
 */
export function expandCollapse(fileId: FileId): ExpandCollapseAction {
    return { type: EXPAND_COLLAPSE, fileId }
}

export function openFile(fileId: FileId): OpenFileAction {
    return { type: OPEN_FILE, fileId }
}

export function selectFile(fileId: FileId, parentFileId: FileId): SelectFileAction {
    return { type: SELECT_FILE, fileId, parentFileId }
}

export function renameFile(fileId: FileId, filename: string): RenameFileAction {
    return { type: RENAME_FILE, fileId, filename }
}

export function setRenamingFile(fileId: FileId, isRenaming: boolean): SetRenamingFileAction {
    return { type: SET_RENAMING_FILE, fileId, isRenaming }
}

export function createFile(isDirectory: boolean): CreateFileAction {
    return { type: CREATE_FILE, isDirectory }
}

export function removeFile(fileId: FileId, parentFileId: FileId): RemoveFileAction {
    return { type: REMOVE_FILE, fileId, parentFileId }
}

export default {
    expandCollapse,
    openFile,
    selectFile,
    renameFile,
    setRenamingFile,
    createFile,
    removeFile
}