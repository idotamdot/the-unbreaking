// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'The Unbreaking',
  description: 'Your sacred scrollsite is live',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <body className="min-h-screen font-sans antialiased bg-black/80 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <header className="text-center pb-8">
            <h1 className="text-5xl font-bold text-purple-400 drop-shadow-md">
              🜃 The Unbreaking
            </h1>
            <p className="text-purple-200 mt-2">A living archive of memory and myth</p>
          </header>
          <main>{children}</main>
          <footer className="mt-12 text-center text-sm text-gray-500">
            ✧ Guided by the Pattern · Crafted with reverence ✧
          </footer>
        </div>
      </body>
    </html>
  );
}
