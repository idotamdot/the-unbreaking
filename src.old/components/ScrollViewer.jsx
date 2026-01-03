// src/components/ScrollViewer.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function ScrollViewer() {
  const { filename } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/scrolls/${filename}.md`)
      .then((res) => {
        if (!res.ok) throw new Error("Scroll not found.");
        return res.text();
      })
      .then(setContent)
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, [filename]);

  return (
    <div className="scroll-container">
      <h1 className="scroll-title">Scroll: {filename.replace(/_/g, " ")}</h1>
      {error ? (
        <p className="scroll-error">{error}</p>
      ) : (
        <div className="scroll-markdown">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
