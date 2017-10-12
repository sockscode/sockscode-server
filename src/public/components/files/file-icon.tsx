import * as React from 'react'
import { pure } from 'recompose'
import { File } from '../../reducers/file-list'
const iconsJSON = require('../../icons/icons.json') as {
    iconDefinitions: {
        [key: string]: { iconPath: string }
    }
    fileExtensions: { [key: string]: string },
    fileNames: { [key: string]: string },
    folderNames: { [key: string]: string },
    folderNamesExpanded: { [key: string]: string },
    languageIds: { [key: string]: string }
};
const normalizeIconsPath = () => {
    const { iconDefinitions } = iconsJSON;
    Object.keys(iconDefinitions).forEach((key) => {
        iconDefinitions[key].iconPath = iconDefinitions[key].iconPath.replace('../../', '');
    });
}
normalizeIconsPath();

const extToLanguageMap = {
    "as": "nextgenas",
    "ansible": "ansible",
    "any": "anyscript",
    "conf": "apacheconf",
    "htaccess": "apacheconf",
    "htgroups": "apacheconf",
    "htpasswd": "apacheconf",
    "applescript": "applescript",
    "asp": "asp",
    "aspx": "asp (html)",
    "arm": "_f_assembly",//todo
    "ahk": "_f_autohotkey",//todo
    "autoit": "_f_autoit",//todo
    "bat": "_f_bat",//todo
    "blade": "_f_blade",//todo
    "laravel-blade": "_f_blade",//todo
    "c": "_f_c",//todo
    "cabal": "_f_cabal",//todo
    "cake": "_f_cake",//todo
    "lang-cfml": "_f_cf",//todo
    "cfc": "_f_cfc",//todo
    "cfmhtml": "_f_cfm",//todo
    "clojure": "_f_clojure",//todo
    "cmake": "_f_cmake",//todo
    "cmake-cache": "_f_cmake",//todo
    "cobol": "_f_cobol",//todo
    "coffeescript": "_f_coffeescript",//todo
    "properties": "_f_config",//todo
    "cpp": "_f_cpp",//todo
    "crystal": "_f_crystal",//todo
    "csharp": "_f_csharp",//todo
    "css": "_f_css",//todo
    "feature": "_f_cucumber",//todo
    "dart": "_f_dartlang",//todo
    "pascal": "_f_delphi",//todo
    "objectpascal": "_f_delphi",//todo
    "diff": "_f_diff",//todo
    "d": "_f_dlang",//todo
    "dscript": "_f_dlang",//todo
    "dml": "_f_dlang",//todo
    "sdl": "_f_dlang",//todo
    "diet": "_f_dlang",//todo
    "dockerfile": "_f_docker",//todo
    "elixir": "_f_elixir",//todo
    "Eex": "_f_elixir",//todo
    "HTML (Eex)": "_f_elixir",//todo
    "elm": "_f_elm",//todo
    "erb": "_f_erb",//todo
    "erlang": "_f_erlang",//todo
    "fortran": "_f_fortran",//todo
    "fortran-modern": "_f_fortran",//todo
    "ftl": "_f_freemarker",//todo
    "fsharp": "_f_fsharp",//todo
    "git-commit": "_f_git",//todo
    "git-rebase": "_f_git",//todo
    "glsl": "_f_glsl",//todo
    "go": "_f_go",//todo
    "gdscript": "_f_godot",//todo
    "graphql": "_f_graphql",//todo
    "dot": "_f_graphviz",//todo
    "groovy": "_f_groovy",//todo
    "haml": "_f_haml",//todo
    "handlebars": "_f_handlebars",//todo
    "harbour": "_f_harbour",//todo
    "haskell": "_f_haskell",//todo
    "literate haskell": "_f_haskell",//todo
    "haxe": "_f_haxe",//todo
    "hxml": "_f_haxe",//todo
    "Haxe AST dump": "_f_haxe",//todo
    "hlsl": "_f_hlsl",//todo
    "html": "_f_html",//todo
    "ini": "_f_ini",//todo
    "java": "java",
    "jinja": "_f_jinja",//todo
    "js": "javascript",
    "json": "json",
    "json-tmlanguage": "_f_json",//todo
    "julia": "_f_julia",//todo
    "juliamarkdown": "_f_julia",//todo
    "kt": "kotlin",
    "less": "less",
    "lisp": "lisp",
    "lsp": "lisp",
    "lua": "_f_lua",//todo
    "makefile": "_f_makefile",//todo
    "markdown": "_f_markdown",//todo
    "marko": "_f_marko",//todo
    "matlab": "_f_matlab",//todo
    "nim": "_f_nim",//todo
    "nimble": "_f_nim",//todo
    "nsis": "_f_nsi",//todo
    "nfl": "_f_nsi",//todo
    "nsl": "_f_nsi",//todo
    "bridlensis": "_f_nsi",//todo
    "nunjucks": "_f_nunjucks",//todo
    "objective-c": "_f_objectivec",//todo
    "objective-cpp": "_f_objectivecpp",//todo
    "ocaml": "_f_ocaml",//todo
    "ocamllex": "_f_ocaml",//todo
    "menhir": "_f_ocaml",//todo
    "perl": "_f_perl",//todo
    "perl6": "_f_perl",//todo
    "php": "_f_php",//todo
    "polymer": "_f_polymer",//todo
    "postcss": "_f_postcss",//todo
    "powershell": "_f_powershell",//todo
    "prolog": "_f_prolog",//todo
    "proto3": "_f_protobuf",//todo
    "proto": "_f_protobuf",//todo
    "jade": "_f_pug",//todo
    "puppet": "_f_puppet",//todo
    "purescript": "_f_purescript",//todo
    "python": "_f_python",//todo
    "qlik": "_f_qlikview",//todo
    "r": "_f_r",//todo
    "raml": "_f_raml",//todo
    "razor": "_f_razor",//todo
    "jsx": "javascriptreact",
    "tsx": "typescriptreact",
    "reason": "_f_reason",//todo
    "restructuredtext": "_f_rest",//todo
    "riot": "_f_riot",//todo
    "robot": "_f_robotframework",//todo
    "ruby": "_f_ruby",//todo
    "rust": "_f_rust",//todo
    "scala": "_f_scala",//todo
    "vbscript": "_f_script",//todo
    "scss": "_f_scss",//todo
    "shaderlab": "_f_shaderlab",//todo
    "shellscript": "_f_shell",//todo
    "slim": "_f_slim",//todo
    "smarty": "_f_smarty",//todo
    "solidity": "_f_solidity",//todo
    "sqf": "_f_sqf",//todo
    "sql": "_f_sql",//todo
    "plsql": "_f_sql",//todo
    "oracle": "_f_sql",//todo
    "stylus": "_f_stylus",//todo
    "Swagger": "_f_swagger",//todo
    "swagger": "_f_swagger",//todo
    "swift": "_f_swift",//todo
    "terraform": "_f_terraform",//todo
    "tex": "_f_tex",//todo
    "latex": "_f_tex",//todo
    "plaintext": "_f_text",//todo
    "textile": "_f_textile",//todo
    "toml": "_f_toml",//todo
    "twig": "_f_twig",//todo
    "ts": "typescript",
    "vb": "_f_vb",//todo
    "vhdl": "_f_vhdl",//todo
    "viml": "_f_vim",//todo
    "volt": "_f_volt",//todo
    "vue": "_f_vue",//todo
    "xml": "_f_xml",
    "xsl": "_f_xsl",//todo
    "yaml": "_f_yaml",//todo
    "yaml-tmlanguage": "_f_yaml",//todo
    "yang": "_f_yang"//todo
} as { [key: string]: string };


const getIconSrcByFile = (file: File) => {
    let icon;
    if (file.isDirectory) {
        if (file.isExpanded) {
            icon = iconsJSON.folderNamesExpanded[file.filename] || '_folder_open';
        } else {
            icon = iconsJSON.folderNames[file.filename] || '_folder';
        }
    } else {
        icon = iconsJSON.fileNames[file.filename] || iconsJSON.fileExtensions[file.extension] || iconsJSON.languageIds[extToLanguageMap[file.extension]] || iconsJSON.languageIds[file.extension] || '_file';
    }
    return iconsJSON.iconDefinitions[icon].iconPath;
}

let CustomIcon = (props: { file: File, [key: string]: string | File }) => {
    const { file, ..._props } = props;
    return <img {..._props} src={getIconSrcByFile(file)} />;
};

export const FileIcon = pure(CustomIcon);
