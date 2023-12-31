import React, { ReactNode } from 'react';
import MonacoEditor from 'react-monaco-editor';
// const MonacoEditor = React.lazy(() => import('react-monaco-editor'));

interface IProps {
  value: string;
  language?: string;
  height?: number;
  onChange?: (value: string) => void;
  isReadOnly?:boolean
  children?: ReactNode;
}

const CodeEditor: React.FC<IProps> = (IProps) => {
  const { value, height = 480, language = 'sql', onChange,isReadOnly=false } = IProps;

  // const editorDidMount = (editor, monaco) => {
  //   console.log('editorDidMount', editor);
  //   editor.focus();
  // };

  const options = {
    selectOnLineNumbers: true,
    fontSize: 14,
    formatOnPaste: true,
    automaticLayout: true,
    readOnly: isReadOnly,
    minimap: {
      enabled: false,
    },
  };

  return (
    <MonacoEditor
      height={height}
      language={language}
      theme="vs-dark"
      value={value}
      options={options}
      onChange={onChange}
      // editorDidMount={editorDidMount}
    />
  );
};

export default CodeEditor;
