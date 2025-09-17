import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function Home() {
  const scrollsDir = path.join(process.cwd(), 'app', 'scrolls');
  const filenames = fs.readdirSync(scrollsDir);

  const scrolls = filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {

      try {
        const filePath = path.join(scrollsDir, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        return {
          slug: filename.replace('.md', ''),
          title: data.title || filename.replace('.md', ''),
        };
      } catch (error) {
        console.error(`Error processing scroll: ${filename}`, error);
        return null;
      }
    })
    .filter(Boolean);


  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scrolls.map((scroll) => (
          <Link key={scroll.slug} href={`/${scroll.slug}`} className="block p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-purple-400">{scroll.title}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
