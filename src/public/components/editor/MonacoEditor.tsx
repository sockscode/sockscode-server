import * as React from 'react';
import CSSModules from 'react-css-modules';
const styles = require("./MonacoEditor.css");

interface MonacoEditorProps {
    code: string,
    onCodeChange: (code: string) => void;
}

interface MonacoEditorState {

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
            this.monacoEditor = monaco.editor.create(this.monacoContainer, {
                theme: "vs-dark",
                value: this.props.code,
                language: 'javascript'
            });
            this.monacoOnDidChangeModelContent = this.monacoEditor.onDidChangeModelContent(() => {
                if (this.skipNextChangeEvent) {
                    this.skipNextChangeEvent = false;
                    return;
                }
                this.props.onCodeChange(this.monacoEditor.getModel().getValue());                
            })
        });
    }

    componentWillUnmount() {
        //destroying monaco editor
    }

    componentDidUpdate(prevProps: MonacoEditorProps, prevState: MonacoEditorState) {
        if (this.monacoEditor) {
            this.skipNextChangeEvent = true;
            this.monacoEditor.getModel().setValue(this.props.code);
        }
    }

    shouldComponentUpdate(nextProps: MonacoEditorProps, nextState: MonacoEditorState) {
        return !this.monacoEditor || this.monacoEditor.getModel().getValue() !== nextProps.code;
    }

    render() {
        return <div className={styles.container} ref={(div) => { this.monacoContainer = div; }}></div>
    }
}