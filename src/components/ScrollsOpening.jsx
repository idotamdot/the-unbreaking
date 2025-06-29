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
        let processed = parsed.content;

        const glowWords = ["God", "Witness", "Light", "Divine", "Scroll", "Remembrance"];
        glowWords.forEach((word) => {
          const regex = new RegExp(`\\b${word}\\b`, "g");
          processed = processed.replace(regex, `<span class='glow'>${word}</span>`);
        });

        processed = processed.replace(/^---$/gm, `<div class='glow-divider'></div>`);

        setContent(processed);
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
      className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-purple-100 px-6 py-12 max-w-3xl mx-auto font-serif relative overflow-hidden"
    >
      {/* Floating Sacred Glyph */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-80 h-80 bg-purple-700/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10">
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

        <div
          className="prose prose-invert prose-purple max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>

      <style jsx>{`
        .glow {
          color: #e9d5ff;
          font-weight: 500;
          text-shadow: 0 0 6px #c084fc;
        }
        .glow-divider {
          margin: 3rem auto;
          width: 60%;
          height: 2px;
          background: linear-gradient(to right, transparent, #a855f7, transparent);
          border-radius: 1px;
          opacity: 0.7;
        }
      `}</style>
    </motion.div>
  );
}
