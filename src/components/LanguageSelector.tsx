import * as React from "react";

const LANGUAGES = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Java", value: "java" },
  { label: "Go", value: "go" },
];

type LanguageSelectorProps = {
  value: string;
  onChange: (lang: string) => void;
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ value, onChange }) => (
  <select
    className="border rounded px-3 py-1 bg-background text-foreground"
    value={value}
    onChange={e => onChange(e.target.value)}
    aria-label="Select language"
  >
    {LANGUAGES.map(lang => (
      <option key={lang.value} value={lang.value}>
        {lang.label}
      </option>
    ))}
  </select>
);

export default LanguageSelector;
