"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LanguageSelector from "../components/LanguageSelector";
import CodeEditor from "../components/CodeEditor";
import ReviewPanel from "../components/ReviewPanel";
import ThemeToggle from "../components/ThemeToggle";
import RoleToggle from "../components/RoleToggle";
import { useCodeStore } from "../hooks/useCodeStore";
import FileExplorer from "../components/FileExplorer";

const DEFAULT_LANGUAGE = "javascript";

export default function Home() {
  const { files, activeFile, setActiveFile, updateFileContent, mainLanguage, setMainLanguage } = useCodeStore();
  const file = files.find(f => f.name === activeFile)!;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center gap-6 p-4 md:p-8">
        <div className="flex w-full max-w-5xl gap-4 flex-col md:flex-row">
          <aside className="w-full md:w-48 mt-4 md:mt-0 flex flex-col gap-4">
            <LanguageSelector value={mainLanguage} onChange={setMainLanguage} />
            <FileExplorer files={files} activeFile={activeFile} onSelect={setActiveFile} />
          </aside>
          <section className="flex flex-col gap-4 flex-1">
            <CodeEditor file={file} onChange={content => updateFileContent(file.name, content)} />
          </section>
          <aside className="w-full md:w-80 mt-4 md:mt-0">
            <ReviewPanel />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
