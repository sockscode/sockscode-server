import * as React from 'react';
import CSSModules from 'react-css-modules';
import { File } from '../../reducers/file-list'
import RaisedButton from 'material-ui/RaisedButton';
import { FileIcon } from '../files/file-icon';
const styles = require("./header.css");

interface HeaderProps {
    filePath: string[],
    file: File
}

interface HeaderState {

}

@CSSModules(styles)
export class Header extends React.Component<HeaderProps, HeaderState>{
    constructor() {
        super();
    }

    render() {
        const { filePath, file } = this.props;
        const content = (filePath && filePath.length) ? filePath.join('/') : 'Untitled';
        const icon = file ? <FileIcon className={styles.icon} file={file} /> : void 0;
        return <RaisedButton className={styles.header} disabled={true} labelPosition="before" icon={icon}>{content}</RaisedButton>;
    }
}