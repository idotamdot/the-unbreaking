// app/scrolls/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Markdown from 'react-markdown';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'app', 'scrolls'));
  return files
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => ({
      slug: filename.replace('.md', ''),
    }));
}

export default async function ScrollPage({ params }: Props) {
  const filePath = path.join(process.cwd(), 'app', 'scrolls', `${params.slug}.md`);

  let content = '';
  let title = 'Scroll Not Found';

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { content: mdContent, data } = matter(fileContent);
    content = mdContent;
    title = data.title || params.slug;
  } catch (error) {
    content = 'We could not locate the sacred scroll you are seeking.';
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-purple-700 drop-shadow-md">
        {title}
      </h1>
      <article className="prose prose-lg dark:prose-invert">
        <Markdown>{content}</Markdown>
      </article>
    </div>
  );
}
