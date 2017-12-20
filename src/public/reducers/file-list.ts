import { EXPAND_COLLAPSE, OPEN_FILE, SELECT_FILE, RENAME_FILE, SET_RENAMING_FILE, CREATE_FILE, REMOVE_FILE, FileListActions } from '../actions/file-list-actions';
import { CodeChangedLocalAction, CodeChangedRemoteAction, LoadFilesStructureAction, CODE_CHANGED_LOCAL, CODE_CHANGED_REMOTE, LOAD_FILES_STRUCTURE } from '../actions/actions';
import { Reducer } from 'redux';
import { Map } from "immutable";
import { update } from '../util/utils';
import LRU from 'lru-cache';

export interface TreeFile {
    filename: string,
    isSelected?: boolean,
    isDirectory?: boolean,
    isExpanded?: boolean,
    extension?: string,
    content: string,
    children: TreeFile[],
    /**
     * If true this file is "loaded" and from master and is ready to be shown, changed, etc
     */
    loaded?: boolean
}

export type FileId = number;

interface FileVague {
    id?: FileId,
    isRoot?: boolean,
    filename?: string,
    isRenaming?: boolean,
    isSelected?: boolean,
    isDirectory?: boolean,
    isExpanded?: boolean,
    extension?: string,
    content?: string,
    children?: FileId[],
    /**
     * If true this file is "loaded" and from master and is ready to be shown, changed, etc
     */
    loaded?: boolean
}

export interface File extends FileVague {
    id: FileId,
    filename: string,
}

export interface FileListState {
    files: Map<FileId, File>,
    open: FileId,
    selected: FileId,
    selectedParent: FileId
}

const dummyFiles: TreeFile[] = [
    {
        filename: "test.js",
        isDirectory: false,
        isSelected: false,
        isExpanded: false,
        extension: 'js',
        content: "var a = 10; \n for (var q = 0; i < 10; i++) {\n    console.log('this is s[parta');\n }",
        children: null
    },
    {
        filename: "src",
        isDirectory: true,
        isSelected: false,
        isExpanded: false,
        content: null,
        children: [
            {
                filename: "src2",
                isDirectory: true,
                isSelected: false,
                isExpanded: false,
                content: null,
                children: [
                    {
                        filename: "test2.js",
                        isDirectory: false,
                        isSelected: false,
                        isExpanded: false,
                        extension: 'js',
                        content: "var a = 10; \n for (var q = 0; i < 10; i++) {\n    console.log('this is s[parta');\n }",
                        children: null
                    },
                    {
                        filename: "testz2.js",
                        isDirectory: false,
                        isSelected: false,
                        isExpanded: false,
                        extension: 'js',
                        content: "var z = 10; \n for (var q = 0; i < 10; i++) {\n    console.log('this is s[parta');\n }",
                        children: null
                    }
                ]
            },
            {
                filename: "test.js",
                isDirectory: false,
                isSelected: false,
                isExpanded: false,
                extension: 'js',
                content: "var a = 10; \n for (var q = 0; i < 10; i++) {\n    console.log('this is s[parta');\n }",
                children: null
            },
            {
                filename: "testz.js",
                isDirectory: false,
                isSelected: false,
                isExpanded: false,
                extension: 'js',
                content: "var z = 10; \n for (var q = 0; i < 10; i++) {\n    console.log('this is s[parta');\n }",
                children: null
            }
        ]
    }, {
        filename: "src1",
        isDirectory: true,
        isSelected: false,
        isExpanded: false,
        content: null,
        children: [
            {
                filename: "src2",
                isDirectory: true,
                isSelected: false,
                isExpanded: false,
                content: null,
                children: [
                    {
                        filename: "test2.js",
                        isDirectory: false,
                        isSelected: false,
                        isExpanded: false,
                        extension: 'js',
                        content: "var a = 10; \n for (var q = 0; i < 10; i++) {\n    console.log('this is s[parta');\n }",
                        children: null
                    },
                    {
                        filename: "testz2.js",
                        isDirectory: false,
                        isSelected: false,
                        isExpanded: false,
                        extension: 'js',
                        content: "var z = 10; \n for (var q = 0; i < 10; i++) {\n    console.log('this is s[parta');\n }",
                        children: null
                    }
                ]
            },
            {
                filename: "test.js",
                isDirectory: false,
                isSelected: false,
                isExpanded: false,
                extension: 'js',
                content: "var a = 10; \n for (var q = 0; i < 10; i++) {\n    console.log('this is s[parta');\n }",
                children: null
            },
            {
                filename: "testz.js",
                isDirectory: false,
                isSelected: false,
                isExpanded: false,
                extension: 'js',
                content: "var z = 10; \n for (var q = 0; i < 10; i++) {\n    console.log('this is s[parta');\n }",
                children: null
            }
        ]
    }, {
        filename: "src2",
        isDirectory: true,
        isSelected: false,
        isExpanded: false,
        content: null,
        children: [
            {
                filename: "src2",
                isDirectory: true,
                isSelected: false,
                isExpanded: false,
                content: null,
                children: [
                    {
                        filename: "test2.js",
                        isDirectory: false,
                        isSelected: false,
                        isExpanded: false,
                        extension: 'js',
                        content: "var a = 10; \n for (var q = 0; i < 10; i++) {\n    console.log('this is s[parta');\n }",
                        children: null
                    },
                    {
                        filename: "testz2.js",
                        isDirectory: false,
                        isSelected: false,
                        isExpanded: false,
                        extension: 'js',
                        content: "var z = 10; \n for (var q = 0; i < 10; i++) {\n    console.log('this is s[parta');\n }",
                        children: null
                    }
                ]
            },
            {
                filename: "test.js",
                isDirectory: false,
                isSelected: false,
                isExpanded: false,
                extension: 'js',
                content: "var a = 10; \n for (var q = 0; i < 10; i++) {\n    console.log('this is s[parta');\n }",
                children: null
            },
            {
                filename: "testz.js",
                isDirectory: false,
                isSelected: false,
                isExpanded: false,
                extension: 'js',
                content: "var z = 10; \n for (var q = 0; i < 10; i++) {\n    console.log('this is s[parta');\n }",
                children: null
            }
        ]
    }
];

const ROOT_FILE_ID = 0;

const getRootFile = (state: FileListState) => {
    return state.files.get(ROOT_FILE_ID);
}

/*const isRootFile = (file: File) => {        
    return isRootFileId(file.id);
}*/

const isRootFileId = (fileId: FileId) => {
    return fileId === ROOT_FILE_ID;
}

const getExtension = (filename: string) => {
    const lastIndexOfDot = filename.lastIndexOf('.');
    const extension = lastIndexOfDot > 0/*not a bug we need to be > then 0*/ ? filename.substring(lastIndexOfDot + 1) : '';
    return extension;
}


const pathCache = LRU<FileId, FileId[]>(100); //cache for most used path to files.
export const getFullPath = (state: FileListState, fileId: FileId): FileId[] => {
    const path = pathCache.get(fileId);
    let currentFile = getRootFile(state);
    if (path && !path.some((pathFileId) => { //check if cached path is still valid.
        if (!currentFile) {
            return true;
        }
        if (~currentFile.children.indexOf(pathFileId)) {
            currentFile = state.files.get(pathFileId);
        } else {
            return true;
        }
    })) {
        return path;
    } else {
        //dfs to find an file path.
        let path: FileId[] = [];
        const findChild = (currentFile: File, fileId: FileId) => {
            const { children } = currentFile;
            if (!children) {
                return false;
            }
            for (let i = 0; i < children.length; i++) {
                const childId = children[i];
                if (childId === fileId) {
                    path.push(fileId);
                    return true;
                } else {
                    if (findChild(state.files.get(childId), fileId)) {
                        if (!isRootFileId(childId)) {
                            path.push(childId);
                        }
                        return true;
                    }
                }
            }
            return false;
        }
        if (findChild(state.files.get(0), fileId)) {
            path = path.reverse();
            pathCache.set(fileId, path);
        } else {
            //FIXME ?
        }
        return path;
    }
}

export const getFullNamesPath = (state: FileListState, fileId: FileId) => {
    return getFullPath(state, fileId).map((fileId) => {
        return state.files.get(fileId).filename;
    });
}

//fixme caching just like for getFullPath
export const findFileByFullNamesPath = (state: FileListState, filePath: string[]) => {
    let currentFile = getRootFile(state);
    let parentFileId = getRootFile(state).id;
    for (let i = 0; i < filePath.length; i++) {
        const isDirectory = i !== (filePath.length - 1);
        const filename = filePath[i];
        const childId = currentFile.children.find((fileId) => {
            const file = state.files.get(fileId);
            return isDirectory === file.isDirectory && file.filename === filename;
        });
        if (!childId) {
            return { fileId: null, parentFileId: null };
        }
        parentFileId = currentFile.id;
        currentFile = state.files.get(childId);
    }
    return { fileId: (currentFile === getRootFile(state)) ? null : currentFile.id, parentFileId };
}

/**
 * Returns new File object with sorted children inside
 * 1. Directories go before files.
 * 2. Alphabetic order.
 */
const sortChildrenOfFile = (state: FileListState, fileId: FileId): File => {
    const file = state.files.get(fileId);
    const children = state.files.get(fileId).children.map(fId => state.files.get(fId)).sort((f1, f2) => (+!(f1.isDirectory) - +!(f2.isDirectory)) || f1.filename.localeCompare(f2.filename)).map(f => f.id);
    return update(file, { children });
}

const sortChildrenOfFileInState = (state: FileListState, fileId: FileId): FileListState => {
    const file = sortChildrenOfFile(state, fileId);
    return updateFileInState(state, fileId, { children: file.children });
}

const mapTreeFilesToFiles = (treeFiles: TreeFile[] = [], remoteFiles = false) => {
    let filesFiles = Map<FileId, File>().withMutations((map) => {
        let nextId = 1;

        const mapTreeFileToFile = (treeFile: TreeFile): number => {
            const id = nextId++;
            const { filename, isSelected, isDirectory, isExpanded, extension, content } = treeFile;
            treeFile.children && treeFile.children.map(mapTreeFileToFile);
            const file: File = { id, isRoot: false, filename, isSelected, isDirectory, isExpanded, extension, content, children: treeFile.children ? treeFile.children.map(mapTreeFileToFile) : [], loaded: !remoteFiles };
            map.set(id, file)
            map.set(id, sortChildrenOfFile({ files: map, open: null, selected: null, selectedParent: null }, id))// fixme

            return id;
        }

        map.set(ROOT_FILE_ID, {
            isRoot: true,
            children: treeFiles.map(mapTreeFileToFile),
            content: null,
            extension: null,
            filename: null,
            id: ROOT_FILE_ID,
            isDirectory: true,
            isExpanded: false,
            isSelected: false,
        });
        map.set(ROOT_FILE_ID, sortChildrenOfFile({ files: map, open: null, selected: null, selectedParent: null }, ROOT_FILE_ID))// fixme
    });

    return filesFiles;
}

export const mapFilesToTreeFiles = (state: FileListState): TreeFile[] => {
    const root = getRootFile(state);
    const mapFileToTreeFile = (fileId: FileId) => {
        const file = state.files.get(fileId);
        const treeFile: TreeFile = {
            content: void 0, extension: file.extension, filename: file.filename, isDirectory: file.isDirectory,
            children: file.children ? file.children.map(mapFileToTreeFile) : void 0
        }
        return treeFile;
    }
    return root.children.map(mapFileToTreeFile);
}

const updateFileInState = <K extends keyof File>(state: FileListState, fileId: FileId, fileUpdate: Pick<File, K>) => {
    const file = state.files.get(fileId);
    const newFile: File = update(file, fileUpdate);
    return update(state, { files: state.files.set(fileId, newFile) });
}

const createFileInState = ({ isDirectory, isRenaming, content, parentFile, state, filename }: { isDirectory: boolean, filename: string, isRenaming: boolean, content: string, parentFile: File, state: FileListState }) => {
    const parentFileId = parentFile.id;
    const nextFileId = state.files.keySeq().max() + 1; //fixme potential 'overflow'
    const newFile: File = {
        id: nextFileId,
        isDirectory,
        filename: filename,
        isRenaming: isRenaming,
        content: isDirectory ? undefined : content,
        children: isDirectory ? [] : undefined,
        extension: isDirectory ? undefined : getExtension(filename),
        loaded: true
    }
    return {
        state: updateFileInState(sortChildrenOfFileInState(
            updateFileInState(
                update(
                    state,
                    { files: state.files.set(newFile.id, newFile) }
                ),
                parentFileId,
                { children: parentFile.children.concat(newFile.id) }
            ),
            parentFileId
        ), parentFileId, { isExpanded: true }), fileId: nextFileId
    };
}

const dummyState: FileListState = { files: mapTreeFilesToFiles(process.env.USE_DUMMY ? dummyFiles : []), open: null, selected: null, selectedParent: null };

(window as any).zzz = dummyState;

const reducer = (state = dummyState, action: FileListActions | CodeChangedLocalAction | CodeChangedRemoteAction | LoadFilesStructureAction): FileListState => {
    console.log(action);
    switch (action.type) {
        case EXPAND_COLLAPSE: {
            const { fileId } = action;
            const file = state.files.get(fileId);
            return updateFileInState(state, fileId, { isExpanded: !file.isExpanded });
        }
        case OPEN_FILE: {
            return update(state, { open: action.fileId });
        }
        case SELECT_FILE: {
            let { files, selected } = state;
            let { fileId: newSelected, parentFileId: newSelectedParentFileId } = action;

            if (selected) {
                if (newSelected === selected) {
                    return state;
                }
                files = files.set(selected, update(files.get(selected), { isSelected: false }));
            }
            if (newSelected) {
                files = files.set(newSelected, update(files.get(newSelected), { isSelected: true }));
            }

            return update(state, { files, selected: newSelected, selectedParent: newSelectedParentFileId });
        }
        case RENAME_FILE: {
            const { fileId, filename } = action;
            const extension = getExtension(filename);
            return updateFileInState(state, fileId, { filename, extension, isRenaming: false });
        }
        case CREATE_FILE: {
            const { isDirectory } = action;
            const { files, selectedParent, selected } = state;            
            const selectedFileId = selected || ROOT_FILE_ID;
            const selectedFile = files.get(selectedFileId);
            const parentFileId = selectedFile.isDirectory ? selectedFile.id : selectedParent;
            const parentFile = files.get(parentFileId);

            return createFileInState({
                isDirectory,
                isRenaming: true,
                content: isDirectory ? undefined : '',
                parentFile,
                state,
                filename: ''
            }).state;
        }
        case REMOVE_FILE: {
            const { fileId, parentFileId } = action;
            const { files } = state;
            const parentFile = files.get(parentFileId);
            const indexOfFile = parentFile.children.indexOf(fileId);
            const children = parentFile.children.slice(0, indexOfFile).concat(parentFile.children.slice(indexOfFile + 1));
            let updatedState = updateFileInState(update(state, { files: state.files.remove(fileId) }), parentFileId, { children });
            if (updatedState.selected === fileId || updatedState.selectedParent === fileId) {
                updatedState = update(updatedState, { selected: null, selectedParent: null });
            }
            if (updatedState.open === fileId) {
                updatedState = update(updatedState, { open: null });
            }

            return updatedState;
        }
        case SET_RENAMING_FILE: {
            const { fileId, isRenaming } = action;
            return updateFileInState(state, fileId, { isRenaming });
        }
        case CODE_CHANGED_LOCAL: {
            if (action.fileId) {
                return updateFileInState(state, action.fileId, { content: action.code });
            }
            break;
        }
        case CODE_CHANGED_REMOTE: {
            const { filePath, code } = action;
            let { fileId } = findFileByFullNamesPath(state, action.filePath);
            let modState = state;
            if (!fileId) {//file doesn't exist yet. let's create it
                const root = getRootFile(modState);
                let currentFile = root;
                filePath.forEach((pathPart, i, arr) => {
                    if (i !== arr.length - 1) {
                        let dirId = currentFile.children.find((fileId) => {
                            const file = modState.files.get(fileId);
                            return file.filename === pathPart && file.isDirectory
                        });
                        if (!dirId) {
                            const createFileRes = createFileInState({
                                isDirectory: true,
                                content: void 0,
                                filename: pathPart,
                                isRenaming: false,
                                parentFile: currentFile,
                                state: modState
                            });
                            modState = createFileRes.state;
                            dirId = createFileRes.fileId;
                        }
                        currentFile = modState.files.get(dirId);
                    } else {
                        //this file doesn't exist, we know this for sure
                        const createFileRes = createFileInState({
                            isDirectory: false,
                            content: void 0,
                            filename: pathPart,
                            isRenaming: false,
                            parentFile: currentFile,
                            state: modState
                        });
                        modState = createFileRes.state;
                        fileId = createFileRes.fileId
                    }
                });
            }
            if (fileId) {
                return update(updateFileInState(modState, fileId, { content: code, loaded: true }), { open: fileId });
            }
            break;
        }
        case LOAD_FILES_STRUCTURE: {
            return Object.assign({ files: mapTreeFilesToFiles(action.files.children, action.remoteFiles), open: null, selected: null, selectedParent: null })
        }
    }
    return state;
}

export const fileList = reducer as Reducer<FileListState>;