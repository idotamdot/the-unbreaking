// app/scrolls/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';

export async function generateStaticParams() {
  const files = fs.readdirSync('scrolls');
  return files.map((file) => ({
    slug: file.replace(/\.md$/, ''),
  }));
}

export default async function ScrollPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scrollPath = path.join(process.cwd(), 'scrolls', `${slug}.md`);

  if (!fs.existsSync(scrollPath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(scrollPath, 'utf-8');
  const { content, data } = matter(fileContent);

  return (
    <div className="prose mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-4">{data.title || slug}</h1>
      <Markdown>{content}</Markdown>
    </div>
  );
}
