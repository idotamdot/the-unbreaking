// app/scrolls/[slug]/page.tsx
'use client';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'next/navigation';

export default function ScrollPage() {
  const params = useParams();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    const loadScroll = async () => {
      try {
        const slug = params?.slug as string;
        const filePath = path.join(process.cwd(), 'scrolls', `${slug}.md`);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { content, data } = matter(fileContent);

        setTitle(data.title || slug);
        setContent(content);
      } catch (error) {
        console.error('Error loading scroll:', error);
        setTitle('Scroll Not Found');
        setContent('We could not locate the sacred scroll you are seeking.');
      }
    };

    loadScroll();
  }, [params]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-purple-700 drop-shadow-md">{title}</h1>
      <article className="prose prose-lg dark:prose-invert">
        <Markdown>{content}</Markdown>
      </article>
    </div>
  );
}
