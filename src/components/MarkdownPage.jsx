import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import matter from "gray-matter";
import { motion } from "framer-motion";

export default function MarkdownPage() {
  const { filename } = useParams();
  const [content, setContent] = useState("");
  const [metadata, setMetadata] = useState({ title: "", subtitle: "" });

  useEffect(() => {
    fetch(`/scrolls/${filename}.md`)
      .then((res) => res.text())
      .then((raw) => {
        const parsed = matter(raw);
        setContent(parsed.content);
        setMetadata(parsed.data);
      })
      .catch(() => {
        setContent("# Scroll Not Found");
        setMetadata({ title: "Scroll Not Found", subtitle: "" });
      });
  }, [filename]);

  return (
    <motion.div
      key={filename}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-purple-100 px-6 py-12 max-w-3xl mx-auto font-serif"
    >
      <div className="mb-10 text-center space-y-2">
        <h1 className="text-3xl md:text-4xl text-purple-300 font-semibold">
          {metadata.title}
        </h1>
        {metadata.subtitle && (
          <p className="text-md md:text-lg text-purple-400 italic">
            {metadata.subtitle}
          </p>
        )}
      </div>

      <div className="mb-10 text-center">
        <a
          href="/"
          className="inline-block bg-purple-800/60 hover:bg-purple-700 text-purple-100 font-medium py-2 px-4 rounded-xl shadow-md transition-all"
        >
          ⮐ Return to the Gateway
        </a>
      </div>

      <ReactMarkdown className="prose prose-invert prose-purple max-w-none">
        {content}
      </ReactMarkdown>
    </motion.div>
  );
}
