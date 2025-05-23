import { create } from "zustand";

export type CodeFile = {
  name: string;
  language: string;
  content: string;
};

const FILES_BY_LANGUAGE: Record<string, CodeFile[]> = {
  go: [
    {
      name: "main.go",
      language: "go",
      content: `package main\n\nimport \"fmt\"\n\nfunc main() {\n  fmt.Println(\"Hello, world!\")\n}`,
    },
    {
      name: "utils.go",
      language: "go",
      content: `package main\n\nfunc Add(a int, b int) int {\n  return a + b\n}`,
    },
    {
      name: "README.md",
      language: "markdown",
      content: `# Go Example\n\nThis is a simple Go project.`,
    },
  ],
  java: [
    {
      name: "Main.java",
      language: "java",
      content: `public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, world!\");\n  }\n}`,
    },
    {
      name: "Utils.java",
      language: "java",
      content: `public class Utils {\n  public static int add(int a, int b) {\n    return a + b;\n  }\n}`,
    },
    {
      name: "README.md",
      language: "markdown",
      content: `# Java Example\n\nThis is a simple Java project.`,
    },
  ],
  javascript: [
    {
      name: "main.js",
      language: "javascript",
      content: `function hello() {\n  console.log('Hello, world!');\n}`,
    },
    {
      name: "utils.js",
      language: "javascript",
      content: `export function add(a, b) {\n  return a + b;\n}`,
    },
    {
      name: "README.md",
      language: "markdown",
      content: `# JavaScript Example\n\nThis is a simple JavaScript project.`,
    },
  ],
  typescript: [
    {
      name: "main.ts",
      language: "typescript",
      content: `function hello(name: string): void {\n  console.log(\`Hello, \\${name}!\`);\n}\n\nhello(\"world\");`,
    },
    {
      name: "utils.ts",
      language: "typescript",
      content: `export function add(a: number, b: number): number {\n  return a + b;\n}`,
    },
    {
      name: "README.md",
      language: "markdown",
      content: `# TypeScript Example\n\nThis is a simple TypeScript project.`,
    },
  ],
};

interface CodeState {
  mainLanguage: string;
  files: CodeFile[];
  activeFile: string;
  setMainLanguage: (lang: string) => void;
  setActiveFile: (name: string) => void;
  updateFileContent: (name: string, content: string) => void;
  setLanguage: (name: string, language: string) => void;
}

export const useCodeStore = create<CodeState>((set) => ({
  mainLanguage: "go",
  files: FILES_BY_LANGUAGE["go"],
  activeFile: FILES_BY_LANGUAGE["go"][0].name,
  setMainLanguage: (lang) => set({
    mainLanguage: lang,
    files: FILES_BY_LANGUAGE[lang],
    activeFile: FILES_BY_LANGUAGE[lang][0].name,
  }),
  setActiveFile: (name) => set({ activeFile: name }),
  updateFileContent: (name, content) => set(state => ({
    files: state.files.map(f => f.name === name ? { ...f, content } : f),
  })),
  setLanguage: (name, language) => set(state => ({
    files: state.files.map(f => f.name === name ? { ...f, language } : f),
  })),
})); 