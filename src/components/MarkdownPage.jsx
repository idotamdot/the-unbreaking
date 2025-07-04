import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { marked } from "marked";
import "prose.css"; // Assuming you have a CSS file for styling
export default function MarkdownPage() {
  const { filename } = useParams();
  const [content, setContent] = useState("Loading...");

  useEffect(() => {
    fetch(`/scrolls/${filename}.md`)
      .then((res) => {
        if (!res.ok) throw new Error("Scroll not found");
        return res.text();
      })
      .then((text) => setContent(text))
      .catch(() => setContent("404: Scroll not found"));
  }, [filename]);

  return (
    <div className="prose mx-auto p-6">
      <div className="sigil fixed top-4 right-4 w-16 h-16 bg-purple-600 rounded-full opacity-60 hover:opacity-100 shadow-lg transition"></div>
      <MarkdownRenderer markdown={content} />
    </div>
  );
}

// Optional: Use a simple markdown renderer
function MarkdownRenderer({ markdown }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked.parse(markdown),
      }}
    />
  );
}
