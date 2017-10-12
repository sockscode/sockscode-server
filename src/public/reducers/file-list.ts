import { EXPAND_COLLAPSE, OPEN_FILE, SELECT_FILE, RENAME_FILE, SET_RENAMING_FILE, CREATE_FILE, REMOVE_FILE, FileListActions } from '../actions/file-list-actions';
import { CodeChangedLocalAction, CodeChangedRemoteAction, CODE_CHANGED_LOCAL, CODE_CHANGED_REMOTE } from '../actions/actions';
import { Map } from "immutable";
import { update } from '../util/utils';

export interface TreeFile {
    filename: string,
    isSelected?: boolean,
    isDirectory?: boolean,
    isExpanded?: boolean,
    extension?: string,
    content: string,
    parentFile: TreeFile,
    children: TreeFile[]
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
    children?: FileId[]
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
        parentFile: null,
        children: null
    },
    {
        filename: "src",
        isDirectory: true,
        isSelected: false,
        isExpanded: false,
        content: null,
        parentFile: null,
        children: [
            {
                filename: "src2",
                isDirectory: true,
                isSelected: false,
                isExpanded: false,
                content: null,
                parentFile: null,
                children: [
                    {
                        filename: "test2.js",
                        isDirectory: false,
                        isSelected: false,
                        isExpanded: false,
                        extension: 'js',
                        content: "var a = 10; \n for (var q = 0; i < 10; i++) {\n    console.log('this is s[parta');\n }",
                        parentFile: null,
                        children: null
                    },
                    {
                        filename: "testz2.js",
                        isDirectory: false,
                        isSelected: false,
                        isExpanded: false,
                        extension: 'js',
                        content: "var z = 10; \n for (var q = 0; i < 10; i++) {\n    console.log('this is s[parta');\n }",
                        parentFile: null,
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
                parentFile: null,
                children: null
            },
            {
                filename: "testz.js",
                isDirectory: false,
                isSelected: false,
                isExpanded: false,
                extension: 'js',
                content: "var z = 10; \n for (var q = 0; i < 10; i++) {\n    console.log('this is s[parta');\n }",
                parentFile: null,
                children: null
            }
        ]
    }, {
        filename: "src1",
        isDirectory: true,
        isSelected: false,
        isExpanded: false,
        content: null,
        parentFile: null,
        children: [
            {
                filename: "src2",
                isDirectory: true,
                isSelected: false,
                isExpanded: false,
                content: null,
                parentFile: null,
                children: [
                    {
                        filename: "test2.js",
                        isDirectory: false,
                        isSelected: false,
                        isExpanded: false,
                        extension: 'js',
                        content: "var a = 10; \n for (var q = 0; i < 10; i++) {\n    console.log('this is s[parta');\n }",
                        parentFile: null,
                        children: null
                    },
                    {
                        filename: "testz2.js",
                        isDirectory: false,
                        isSelected: false,
                        isExpanded: false,
                        extension: 'js',
                        content: "var z = 10; \n for (var q = 0; i < 10; i++) {\n    console.log('this is s[parta');\n }",
                        parentFile: null,
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
                parentFile: null,
                children: null
            },
            {
                filename: "testz.js",
                isDirectory: false,
                isSelected: false,
                isExpanded: false,
                extension: 'js',
                content: "var z = 10; \n for (var q = 0; i < 10; i++) {\n    console.log('this is s[parta');\n }",
                parentFile: null,
                children: null
            }
        ]
    }, {
        filename: "src2",
        isDirectory: true,
        isSelected: false,
        isExpanded: false,
        content: null,
        parentFile: null,
        children: [
            {
                filename: "src2",
                isDirectory: true,
                isSelected: false,
                isExpanded: false,
                content: null,
                parentFile: null,
                children: [
                    {
                        filename: "test2.js",
                        isDirectory: false,
                        isSelected: false,
                        isExpanded: false,
                        extension: 'js',
                        content: "var a = 10; \n for (var q = 0; i < 10; i++) {\n    console.log('this is s[parta');\n }",
                        parentFile: null,
                        children: null
                    },
                    {
                        filename: "testz2.js",
                        isDirectory: false,
                        isSelected: false,
                        isExpanded: false,
                        extension: 'js',
                        content: "var z = 10; \n for (var q = 0; i < 10; i++) {\n    console.log('this is s[parta');\n }",
                        parentFile: null,
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
                parentFile: null,
                children: null
            },
            {
                filename: "testz.js",
                isDirectory: false,
                isSelected: false,
                isExpanded: false,
                extension: 'js',
                content: "var z = 10; \n for (var q = 0; i < 10; i++) {\n    console.log('this is s[parta');\n }",
                parentFile: null,
                children: null
            }
        ]
    }
];

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

let filesFiles = Map<FileId, File>().withMutations((map) => {
    let nextId = 1;

    const mapTreeFileToFile = (treeFile: TreeFile): number => {
        const id = nextId++;
        const { filename, isSelected, isDirectory, isExpanded, extension, content } = treeFile;
        treeFile.children && treeFile.children.map(mapTreeFileToFile);
        const file: File = { id, isRoot: false, filename, isSelected, isDirectory, isExpanded, extension, content, children: treeFile.children ? treeFile.children.map(mapTreeFileToFile) : [] };
        map.set(id, file)
        map.set(id, sortChildrenOfFile({ files: map, open: null, selected: null, selectedParent: null }, id))// fixme

        return id;
    }

    map.set(0, {
        isRoot: true,
        children: dummyFiles.map(mapTreeFileToFile),
        content: null,
        extension: null,
        filename: null,
        id: 0,
        isDirectory: true,
        isExpanded: false,
        isSelected: false,
    });
    map.set(0, sortChildrenOfFile({ files: map, open: null, selected: null, selectedParent: null }, 0))// fixme
});

const updateFileInState = <K extends keyof File>(state: FileListState, fileId: FileId, fileUpdate: Pick<File, K>) => {
    const file = state.files.get(fileId);
    const newFile: File = update(file, fileUpdate);
    return update(state, { files: state.files.set(fileId, newFile) });
}

const dummyState: FileListState = { files: filesFiles, open: null, selected: null, selectedParent: null };
(window as any).zzz = dummyState;

const reducer = (state = dummyState, action: FileListActions | CodeChangedLocalAction | CodeChangedRemoteAction): FileListState => {
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
            const lastIndexOfDot = filename.lastIndexOf('.');
            const extension = lastIndexOfDot > 0/*not a bug we need to be > then 0*/ ? filename.substring(lastIndexOfDot + 1) : '';
            return updateFileInState(state, fileId, { filename, extension, isRenaming: false });
        }
        case CREATE_FILE: {
            const { isDirectory } = action;
            const { files, selectedParent, selected } = state;
            const nextFileId = files.keySeq().max() + 1; //fixme potential 'overflow'
            const selectedFileId = selected || 0;
            const selectedFile = files.get(selectedFileId);
            const parentFileId = selectedFile.isDirectory ? selectedFile.id : selectedParent;
            const parentFile = files.get(parentFileId);

            const newFile: File = {
                id: nextFileId,
                isDirectory,
                filename: '',
                isRenaming: true,
                content: isDirectory ? undefined : '',
                children: isDirectory ? [] : undefined
            }
            return updateFileInState(sortChildrenOfFileInState(
                updateFileInState(
                    update(
                        state,
                        { files: state.files.set(newFile.id, newFile) }
                    ),
                    parentFileId,
                    { children: parentFile.children.concat(newFile.id) }
                ),
                parentFileId
            ), parentFileId, { isExpanded: true });
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
        case CODE_CHANGED_LOCAL: case CODE_CHANGED_REMOTE: {
            const openFileId = state.open;
            if (openFileId) {
                return updateFileInState(state, openFileId, { content: action.code });
            }
        }
    }
    return state;
}

export const fileList = reducer;