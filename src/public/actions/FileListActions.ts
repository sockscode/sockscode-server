import { Dispatch } from 'redux';
import { SocketIoCodeService } from '../service/SocketIoCodeService';
import { File, FileId } from '../reducers/FileList';
/*
 * action types
 */
export const EXPAND_COLLAPSE = 'EXPAND_COLLAPSE' as 'EXPAND_COLLAPSE';
export const OPEN_FILE = 'OPEN_FILE' as 'OPEN_FILE';

interface ActionWithFile {
    fileId: FileId
}

export interface ExpandCollapseAction extends ActionWithFile {
    type: typeof EXPAND_COLLAPSE;
}

export interface OpenFileAction extends ActionWithFile {
    type: typeof OPEN_FILE;
}

export type FileListActions = ExpandCollapseAction | OpenFileAction;
/*
 * action creators
 */
export function expandCollapse(fileId: FileId): ExpandCollapseAction {
    return { type: EXPAND_COLLAPSE, fileId }
}


export function openFile(fileId: FileId): OpenFileAction {
    return { type: OPEN_FILE, fileId }
}

export default {
    expandCollapse,
    openFile
}