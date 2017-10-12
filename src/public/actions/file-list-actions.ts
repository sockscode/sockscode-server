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

export type FileListActions = ExpandCollapseAction | OpenFileAction | SelectFileAction | RenameFileAction | SetRenamingFileAction;
/*
 * action creators
 */
export function expandCollapse(fileId: FileId): ExpandCollapseAction {
    return { type: EXPAND_COLLAPSE, fileId }
}

export function openFile(fileId: FileId): OpenFileAction {
    return { type: OPEN_FILE, fileId }
}

export function selectFile(fileId: FileId): SelectFileAction {
    return { type: SELECT_FILE, fileId }
}

export function renameFile(fileId: FileId, filename: string): RenameFileAction {
    return { type: RENAME_FILE, fileId, filename }
}

export function setRenamingFile(fileId: FileId, isRenaming: boolean): SetRenamingFileAction {
    return { type: SET_RENAMING_FILE, fileId, isRenaming }
}

export default {
    expandCollapse,
    openFile,
    selectFile,
    renameFile,
    setRenamingFile
}