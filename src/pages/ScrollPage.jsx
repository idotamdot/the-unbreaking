// src/pages/ScrollPage.jsx
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function ScrollPage() {
  const { filename } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/scrolls/${filename}.md`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Scroll not found");
        }
        return res.text();
      })
      .then(setContent)
      .catch((err) => setError(err.message));
  }, [filename]);

  if (error) {
    return (
      <div className="text-center mt-10 text-red-400">
        ⚠️ {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-sigilwhite px-6 py-12">
      <div className="prose prose-invert prose-lg max-w-3xl mx-auto font-serif">
        <ReactMarkdown
          children={content}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        />
      </div>
    </div>
  );
}
