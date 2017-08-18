import { EXPAND_COLLAPSE, OPEN_FILE, SELECT_FILE, FileListActions } from '../actions/file-list-actions';
import { CodeChangedLocalAction, CodeChangedRemoteAction, CODE_CHANGED_LOCAL, CODE_CHANGED_REMOTE } from '../actions/actions';
import { Map, fromJS } from "immutable";

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

let filesFiles = Map<FileId, File>().withMutations((map) => {
    let nextId = 1;

    const mapTreeFileToFile = (treeFile: TreeFile): number => {
        const id = nextId++;
        const { filename, isSelected, isDirectory, isExpanded, extension, content } = treeFile;
        const children = treeFile.children ? treeFile.children.map(mapTreeFileToFile) : [];
        const file: File = { id, isRoot: false, filename, isSelected, isDirectory, isExpanded, extension, content, children: treeFile.children ? treeFile.children.map(mapTreeFileToFile) : [] };
        map.set(id, file)

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
        isSelected: false
    });
});

const dummyState: FileListState = { files: filesFiles, open: null, selected: null };
(window as any).zzz = dummyState;

const updateFile = (file: File, change: FileVague): File => {
    return Object.assign({}, file, change);
}

const updateState = (state: FileListState, change: FileListStateVague) => {
    return Object.assign({}, state, change);
}

const reducer = (state = dummyState, action: FileListActions | CodeChangedLocalAction | CodeChangedRemoteAction) => {
    console.log(action);
    switch (action.type) {
        case EXPAND_COLLAPSE: {
            const { fileId } = action;
            const file = state.files.get(fileId);
            const newFile: File = updateFile(file, { isExpanded: !file.isExpanded });
            return updateState(state, { files: state.files.set(fileId, newFile) });
        }
        case OPEN_FILE: {
            return updateState(state, { open: action.fileId });
        }
        case SELECT_FILE: {
            let { files, selected } = state;
            let { fileId: newSelected } = action;

            if (selected) {
                if (newSelected === selected) {
                    return state;
                }
                files = files.set(selected, updateFile(files.get(selected), { isSelected: false }));
            }
            if (newSelected) {
                files = files.set(newSelected, updateFile(files.get(newSelected), { isSelected: true }));
            }

            return updateState(state, { files, selected: newSelected });
        }
        case CODE_CHANGED_LOCAL: case CODE_CHANGED_REMOTE: {
            const openFileId = state.open;
            if (openFileId) {
                const openFile = state.files.get(openFileId);
                const newFile: File = updateFile(openFile, { content: action.code });
                return updateState(state, { files: state.files.set(openFileId, newFile) });
            }
        }
    }
    return state;
}

export const fileList = reducer;