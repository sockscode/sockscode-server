import { Dispatch } from 'redux';
import { SocketIoCodeService } from '../service/socket-io-code-service';
import { File, FileId } from '../reducers/file-list';
/*
 * action types
 */
export const EXPAND_COLLAPSE = 'EXPAND_COLLAPSE' as 'EXPAND_COLLAPSE';
export const OPEN_FILE = 'OPEN_FILE' as 'OPEN_FILE';
export const SELECT_FILE = 'SELECT_FILE' as 'SELECT_FILE';

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
export type FileListActions = ExpandCollapseAction | OpenFileAction | SelectFileAction;
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

export default {
    expandCollapse,
    openFile,
    selectFile
}