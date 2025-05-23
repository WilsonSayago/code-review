"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LanguageSelector from "../components/LanguageSelector";
import CodeEditor from "../components/CodeEditor";
import { useCodeStore } from "../hooks/useCodeStore";
import FileExplorer from "@/components/FileExplorer";

export default function Home() {
  const { files, activeFile, setActiveFile, updateFileContent, mainLanguage, setMainLanguage } = useCodeStore();
  const file = files.find(f => f.name === activeFile)!;
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onVisibility = () => {
      setHidden(document.visibilityState !== "visible");
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#e0e7ef] to-[#f1f5f9] dark:from-[#18181b] dark:via-[#23272f] dark:to-[#18181b] text-foreground relative">
      {hidden && (
        <div className="fixed inset-0 z-50 bg-black transition-opacity duration-200" style={{ pointerEvents: 'none' }} />
      )}
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center gap-8 p-4 md:p-10">
        <div className="flex w-full max-w-6xl gap-6 flex-col md:flex-row">
          <aside className="w-full md:w-56 flex flex-col gap-4 bg-white/80 dark:bg-zinc-900/80 rounded-xl shadow-lg p-4 border border-zinc-200 dark:border-zinc-800 min-h-[420px]">
            <LanguageSelector value={mainLanguage} onChange={setMainLanguage} />
            <FileExplorer files={files} activeFile={activeFile} onSelect={setActiveFile} />
          </aside>
          <section className="flex flex-col gap-4 flex-1">
            <div className="bg-white/90 dark:bg-zinc-900/90 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-2 md:p-4 flex-1 flex flex-col min-h-[420px]">
              <CodeEditor file={file} onChange={content => updateFileContent(file.name, content)} />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
