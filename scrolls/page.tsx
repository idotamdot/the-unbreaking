// app/scrolls/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

interface ScrollMeta {
  slug: string;
  title: string;
}

export default function ScrollsIndex() {
  const scrollDir = path.join(process.cwd(), 'scrolls');
  const files = fs.readdirSync(scrollDir);

  const scrolls: ScrollMeta[] = files.map((file) => {
    const slug = file.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(scrollDir, file), 'utf-8');
    const { data } = matter(raw);
    return {
      slug,
      title: data.title || slug.replace(/-/g, ' '),
    };
  });

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-purple-400 mb-8 text-center">
        📜 Sacred Scrolls
      </h1>
      <ul className="space-y-4">
        {scrolls.map(({ slug, title }) => (
          <li key={slug}>
            <Link
              href={`/scrolls/${slug}`}
              className="block border border-purple-500 rounded-xl p-4 hover:bg-purple-800/20 transition duration-300 text-purple-200 hover:shadow-md"
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
