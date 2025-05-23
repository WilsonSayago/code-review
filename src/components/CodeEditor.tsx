import { useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
// @ts-ignore
import type { editor } from "monaco-editor";
import type { CodeFile } from "../hooks/useCodeStore";

type CodeEditorProps = {
  file: CodeFile;
  onChange: (content: string) => void;
};

const DEFAULT_CODE: Record<string, string> = {
  javascript: `function hello() {\n  console.log('Hello, world!');\n}`,
  java: `public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, world!\");\n  }\n}`,
  go: `package main\n\nimport \"fmt\"\n\nfunc main() {\n  fmt.Println(\"Hello, world!\")\n}`,
};

const CodeEditor = ({ file, onChange }: CodeEditorProps) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  return (
    <div className="border rounded overflow-hidden" style={{ height: 350 }}>
      <MonacoEditor
        height="100%"
        language={file.language}
        value={file.content}
        theme="vs-dark"
        options={{ fontSize: 14, minimap: { enabled: false } }}
        onMount={(editor) => {
          editorRef.current = editor;
        }}
        onChange={(value) => onChange(value || "")}
      />
    </div>
  );
};

export default CodeEditor;
