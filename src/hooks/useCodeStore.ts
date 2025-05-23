import { create } from "zustand";

interface CodeState {
  language: string;
  code: string;
  setLanguage: (lang: string) => void;
  setCode: (code: string) => void;
}

const DEFAULT_CODE: Record<string, string> = {
  javascript: `function hello() {\n  console.log('Hello, world!');\n}`,
  java: `public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, world!\");\n  }\n}`,
  go: `package main\n\nimport \"fmt\"\n\nfunc main() {\n  fmt.Println(\"Hello, world!\")\n}`,
};

export const useCodeStore = create<CodeState>((set, get) => ({
  language: "javascript",
  code: DEFAULT_CODE["javascript"],
  setLanguage: (lang) => set({
    language: lang,
    code: DEFAULT_CODE[lang] || "",
  }),
  setCode: (code) => set({ code }),
})); 