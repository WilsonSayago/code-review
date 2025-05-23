import type { CodeFile } from "../hooks/useCodeStore";
import { useCodeStore } from "../hooks/useCodeStore";

type FileExplorerProps = {
  files: CodeFile[];
  activeFile: string;
  onSelect: (name: string) => void;
};

const FileExplorer = ({ files, activeFile, onSelect }: FileExplorerProps) => {
  const mainLanguage = useCodeStore(s => s.mainLanguage);
  const addFile = useCodeStore(s => s.addFile);

  const handleAddFile = () => {
    const name = prompt("Enter new file name (e.g. newFile.ts):");
    if (!name) return;
    // Infer language from extension
    let language = mainLanguage;
    if (name.endsWith('.js')) language = 'javascript';
    if (name.endsWith('.ts')) language = 'typescript';
    if (name.endsWith('.go')) language = 'go';
    if (name.endsWith('.java')) language = 'java';
    if (name.endsWith('.md')) language = 'markdown';
    addFile({ name, language, content: '' });
  };

  return (
    <nav className="flex flex-col gap-1 bg-muted/40 rounded p-2">
      <span className="font-semibold text-xs text-muted-foreground mb-2">Files</span>
      {files.map(file => (
        <button
          key={file.name}
          className={`text-left px-2 py-1 rounded transition-colors text-sm ${file.name === activeFile ? 'bg-primary text-primary-foreground font-bold' : 'hover:bg-accent'}`}
          onClick={() => onSelect(file.name)}
        >
          {file.name}
        </button>
      ))}
      <button
        className="mt-2 px-2 py-1 rounded bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition"
        onClick={handleAddFile}
        type="button"
      >
        + Add file
      </button>
    </nav>
  );
};

export default FileExplorer; 