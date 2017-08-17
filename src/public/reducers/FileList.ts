import { EXPAND_COLLAPSE, OPEN_FILE, FileListActions } from '../actions/FileListActions';
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

export type File = {
    id: FileId,
    isRoot: boolean,
    filename: string,
    isSelected?: boolean,
    isDirectory?: boolean,
    isExpanded?: boolean,
    extension?: string,
    content: string,
    children: FileId[]
}

export interface FileListState {
    files: Map<FileId, File>,
    open: FileId
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

const dummyState: FileListState = { files: filesFiles, open: null };
(window as any).zzz = dummyState;

const reducer = (state = dummyState, action: FileListActions) => {
    console.log(action);
    switch (action.type) {
        case EXPAND_COLLAPSE:
            const { fileId } = action;
            const file = state.files.get(fileId);
            const newFile: File = Object.assign({}, file, { isExpanded: !file.isExpanded });
            return Object.assign({}, state, { files: state.files.set(fileId, newFile) });
        case OPEN_FILE:
            return Object.assign({}, state, { open: action.fileId });
        default:
            return state;
    }
}

export const fileList = reducer;