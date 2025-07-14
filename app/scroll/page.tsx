'use client';

import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default async function ScrollIndexPage() {
  const scrollDir = path.join(process.cwd(), 'scrolls');
  const files = fs.readdirSync(scrollDir).filter(file => file.endsWith('.md'));

  return (
    <div className="min-h-screen py-10 px-6 bg-gradient-to-b from-slate-950 to-black text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">📜 Sacred Scrolls Archive</h1>
        <p className="text-gray-300 mb-10 text-center">
          These are the known writings recorded in The Unbreaking. Each scroll carries memory, meaning, and metaphysical resonance.
        </p>
        <ul className="space-y-4">
          {files.map((file, i) => {
            const slug = file.replace(/\.md$/, '');
            return (
              <li key={i}>
                <Link href={`/scroll/${slug}`}>
                  <a className="block p-4 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-200 shadow-md">
                    <h2 className="text-xl font-semibold text-purple-300 hover:underline">
                      {slug.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h2>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
