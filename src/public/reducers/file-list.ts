import { EXPAND_COLLAPSE, OPEN_FILE, SELECT_FILE, RENAME_FILE, FileListActions } from '../actions/file-list-actions';
import { CodeChangedLocalAction, CodeChangedRemoteAction, CODE_CHANGED_LOCAL, CODE_CHANGED_REMOTE } from '../actions/actions';
import { Map, fromJS } from "immutable";
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
    isSelected?: boolean,
    isDirectory?: boolean,
    isExpanded?: boolean,
    extension?: string,
    content?: string,
    children?: FileId[]
}

export interface File extends FileVague {
    id: FileId,
    isRoot: boolean,
    filename: string,
    content: string,
    children: FileId[]
}

interface FileListStateVague {
    files?: Map<FileId, File>,
    open?: FileId,
    selected?: FileId
}

export interface FileListState {
    files: Map<FileId, File>,
    open: FileId,
    selected: FileId
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

let filesFiles = Map<FileId, File>().withMutations((map) => {
    let nextId = 1;

    const mapTreeFileToFile = (treeFile: TreeFile): number => {
        const id = nextId++;
        const { filename, isSelected, isDirectory, isExpanded, extension, content } = treeFile;
        const children = treeFile.children ? treeFile.children.map(mapTreeFileToFile) : [];
        const file: File = { id, isRoot: false, filename, isSelected, isDirectory, isExpanded, extension, content, children: treeFile.children ? treeFile.children.map(mapTreeFileToFile) : [] };
        map.set(id, file)
        map.set(id, sortChildrenOfFile({ files: map, open: null, selected: null }, id))// fixme

        return id;
    }

    map.set(0, {
        isRoot: true,
        children: dummyFiles.map(mapTreeFileToFile),
        content: null,
        extension: null,
        filename: null,
        id: 0,
        isDirectory: false,
        isExpanded: false,
        isSelected: false,
    });
    map.set(0, sortChildrenOfFile({ files: map, open: null, selected: null }, 0))// fixme
});

const dummyState: FileListState = { files: filesFiles, open: null, selected: null };
(window as any).zzz = dummyState;

const reducer = (state = dummyState, action: FileListActions | CodeChangedLocalAction | CodeChangedRemoteAction) => {
    console.log(action);
    switch (action.type) {
        case EXPAND_COLLAPSE: {
            const { fileId } = action;
            const file = state.files.get(fileId);
            const newFile: File = update(file, { isExpanded: !file.isExpanded });
            return update(state, { files: state.files.set(fileId, newFile) });
        }
        case OPEN_FILE: {
            return update(state, { open: action.fileId });
        }
        case SELECT_FILE: {
            let { files, selected } = state;
            let { fileId: newSelected } = action;

            if (selected) {
                if (newSelected === selected) {
                    return state;
                }
                files = files.set(selected, update(files.get(selected), { isSelected: false }));
            }
            if (newSelected) {
                files = files.set(newSelected, update(files.get(newSelected), { isSelected: true }));
            }

            return update(state, { files, selected: newSelected });
        }
        case RENAME_FILE: {
            const { fileId, filename } = action;
            const { files } = state;
            const lastIndexOfDot = filename.lastIndexOf('.');
            const extension = lastIndexOfDot > 0/*not a bug we need to be > then 0*/ ? filename.substring(lastIndexOfDot + 1) : '';
            return update(state, { files: files.set(fileId, update(files.get(fileId), { filename, extension })) });
        }
        case CODE_CHANGED_LOCAL: case CODE_CHANGED_REMOTE: {
            const openFileId = state.open;
            if (openFileId) {
                const openFile = state.files.get(openFileId);
                const newFile: File = update(openFile, { content: action.code });
                return update(state, { files: state.files.set(openFileId, newFile) });
            }
        }
    }
    return state;
}

export const fileList = reducer;