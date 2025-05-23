import type { CodeFile } from "../hooks/useCodeStore";

type FileExplorerProps = {
  files: CodeFile[];
  activeFile: string;
  onSelect: (name: string) => void;
};

const FileExplorer = ({ files, activeFile, onSelect }: FileExplorerProps) => (
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
  </nav>
);

export default FileExplorer; 