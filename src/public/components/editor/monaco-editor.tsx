import * as React from 'react';
import CSSModules from 'react-css-modules';
import { File } from '../../reducers/file-list'
const styles = require("./monaco-editor.css");

interface MonacoEditorProps {
    language?: monaco.languages.ILanguageExtensionPoint
    code: string,
    fileId: number | null,
    onCodeChange: (code: string, fileId: number | null) => void;
}

interface MonacoEditorState {

}

function ignoreCaseContains(arr: string[], s: string) {
    return !!arr.find((ss) => ss.toLowerCase() === s.toLowerCase());
}

export function detectMonacoLanguage(file: File): monaco.languages.ILanguageExtensionPoint {
    return monaco.languages.getLanguages().find((l) => {
        return (l.extensions && ignoreCaseContains(l.extensions, '.' + file.extension)) ||
            (l.filenames && l.filenames && ignoreCaseContains(l.filenames, file.filename));
    });
}

@CSSModules(styles)
export class MonacoEditor extends React.Component<MonacoEditorProps, MonacoEditorState>{
    private monacoContainer: HTMLDivElement = null;
    private monacoEditor: monaco.editor.IStandaloneCodeEditor = null;
    private monacoOnDidChangeModelContent: monaco.IDisposable = null;
    private skipNextChangeEvent: boolean = false;

    constructor() {
        super();
    }

    componentDidMount() {
        //rendering monaco editor
        (window as any).require(['vs/editor/editor.main'], () => {
            console.log(monaco.languages.getLanguages()[0].firstLine);
            const { language } = this.props;
            this.monacoEditor = monaco.editor.create(this.monacoContainer, {
                theme: "vs-dark",
                value: this.props.code,
                language: language ? language.id : 'txt'
            });
            this.monacoOnDidChangeModelContent = this.monacoEditor.onDidChangeModelContent(() => {
                if (this.skipNextChangeEvent) {
                    this.skipNextChangeEvent = false;
                    return;
                }
                this.props.onCodeChange(this.monacoEditor.getModel().getValue(), this.props.fileId);
            })
        });
    }

    componentWillUnmount() {
        //destroying monaco editor
        this.monacoOnDidChangeModelContent
    }

    componentDidUpdate(_prevProps: MonacoEditorProps, _prevState: MonacoEditorState) {
        const { code, language } = this.props;
        if (this.monacoEditor) {
            this.skipNextChangeEvent = true;
            const position = this.monacoEditor.getPosition();
            this.monacoEditor.getModel().setValue(code);
            this.monacoEditor.setPosition(position);
            monaco.editor.setModelLanguage(this.monacoEditor.getModel(), language ? language.id : 'txt');
        }
    }

    shouldComponentUpdate(nextProps: MonacoEditorProps, _nextState: MonacoEditorState) {
        return !this.monacoEditor || this.monacoEditor.getModel().getValue() !== nextProps.code || this.props.language !== nextProps.language;
    }

    render() {
        return <div className={styles.container} ref={(div) => { this.monacoContainer = div; }}></div>
    }
}