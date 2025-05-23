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

const DEFAULT_LANGUAGE = "javascript";

export default function Home() {
  const { language, setLanguage, code, setCode } = useCodeStore();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center gap-6 p-4 md:p-8">
        <div className="flex w-full max-w-5xl gap-4 flex-col md:flex-row">
          <section className="flex flex-col gap-4 flex-1">
            <div className="flex items-center gap-4">
              <LanguageSelector value={language} onChange={setLanguage} />
              <RoleToggle />
              <ThemeToggle />
            </div>
            <CodeEditor language={language} code={code} onChange={setCode} />
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
