import { useRef, useEffect } from "react";
import MonacoEditor, { useMonaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import type { CodeFile } from "../hooks/useCodeStore";

type CodeEditorProps = {
  file: CodeFile;
  onChange: (content: string) => void;
};

const CodeEditor = ({ file, onChange }: CodeEditorProps) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monaco = useMonaco();

  useEffect(() => {
    const editorEl = document.querySelector('.monaco-editor');
    if (!editorEl) return;
    const blockEvent = (e: Event) => e.preventDefault();
    editorEl.addEventListener('copy', blockEvent);
    editorEl.addEventListener('paste', blockEvent);
    editorEl.addEventListener('cut', blockEvent);
    return () => {
      editorEl.removeEventListener('copy', blockEvent);
      editorEl.removeEventListener('paste', blockEvent);
      editorEl.removeEventListener('cut', blockEvent);
    };
  }, [file.name]);

  const handleEditorMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    if (monaco) {
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyC, () => {});
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => {});
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyX, () => {});
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Insert, () => {});
      editor.addCommand(monaco.KeyMod.Shift | monaco.KeyCode.Insert, () => {});
    }
    editor.updateOptions({ contextmenu: false });
    editor.onContextMenu((e) => {
      e.event.preventDefault();
    });
    editor.onKeyDown((e) => {
      const key = e.browserEvent.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && ["c", "v", "x", "a"].includes(key)) {
        e.preventDefault();
      }
    });
    editor.onKeyUp((e) => {
      const key = e.browserEvent.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && ["c", "v", "x", "a"].includes(key)) {
        e.preventDefault();
      }
    });
    editor.updateOptions({ padding: { top: 20, bottom: 20 } });
  };

  return (
    <div className="border rounded overflow-hidden h-full">
      <MonacoEditor
        height="100%"
        language={file.language}
        value={file.content}
        theme="vs-dark"
        options={{ fontSize: 14, minimap: { enabled: false }, contextmenu: false, padding: { top: 20, bottom: 20 } }}
        onMount={handleEditorMount}
        onChange={(value) => onChange(value || "")}
      />
    </div>
  );
};

export default CodeEditor;
