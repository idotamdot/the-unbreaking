import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

// Helper function to extract date from filename or content
function extractDate(filename: string, fileContents: string, frontmatter: any): Date | null {
  // Try to extract date from filename (format: YYYY-MM-DD-title.md)
  const dateMatch = filename.match(/^(\d{4})-(\d{2})-(\d{2})-/);
  if (dateMatch) {
    return new Date(parseInt(dateMatch[1]), parseInt(dateMatch[2]) - 1, parseInt(dateMatch[3]));
  }

  // Try to extract from frontmatter
  if (frontmatter.date) {
    return new Date(frontmatter.date);
  }

  // Try to extract from content markdown bold date (e.g., **Date:** 2025-07-01)
  const contentDateMatch = fileContents.match(/\*\*Date:\*\*\s*(\d{4}-\d{2}-\d{2})/);
  if (contentDateMatch) {
    return new Date(contentDateMatch[1]);
  }

  return null;
}

type ScrollItem = {
  slug: string;
  title: string;
  date: Date | null;
  dateString: string | null;
  excerpt: string;
};

export default function Home() {
  const scrollsDir = path.join(process.cwd(), 'app', 'scrolls');
  const filenames = fs.readdirSync(scrollsDir);

  const scrolls: ScrollItem[] = filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      try {
        const filePath = path.join(scrollsDir, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        const date = extractDate(filename, fileContents, data);
        
        return {
          slug: filename.replace('.md', ''),
          title: data.title || filename.replace('.md', '').replace(/-/g, ' '),
          date: date,
          dateString: date ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : null,
          excerpt: content.substring(0, 150).replace(/[#*\[\]]/g, '').trim() + '...',
        };
      } catch (error) {
        console.error(`Error processing scroll: ${filename}`, error);
        return null;
      }
    })
    .filter((item): item is ScrollItem => item !== null)
    .sort((a, b) => {
      // Sort by date, newest first. Scrolls without dates go to the bottom
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return b.date.getTime() - a.date.getTime();
    });

  return (
    <main>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-purple-300 mb-8 text-center">📜 Sacred Timeline</h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-purple-700 to-transparent"></div>
          
          {/* Timeline entries */}
          <div className="space-y-8">
            {scrolls.map((scroll, index) => (
              <div key={scroll.slug} className="relative pl-20">
                {/* Timeline dot */}
                <div className="absolute left-6 top-2 w-4 h-4 rounded-full bg-purple-500 border-4 border-black shadow-lg shadow-purple-500/50"></div>
                
                {/* Date badge */}
                {scroll.dateString && (
                  <div className="absolute left-12 top-0 text-xs text-purple-300 font-semibold whitespace-nowrap">
                    {scroll.dateString}
                  </div>
                )}
                
                {/* Scroll card */}
                <Link 
                  href={`/${scroll.slug}`} 
                  className="block mt-8 p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                >
                  <h3 className="text-2xl font-bold text-purple-400 mb-2">{scroll.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-3">{scroll.excerpt}</p>
                  <div className="mt-4 text-purple-300 text-sm font-semibold">
                    Read scroll →
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        
        {scrolls.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No scrolls found. The archive awaits its first entry...
          </div>
        )}
      </div>
    </main>
  );
}
