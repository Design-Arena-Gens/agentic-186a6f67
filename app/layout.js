export const metadata = {
  title: 'Creator AI ? YouTube Toolkit',
  description: 'AI thumbnails, titles, and channel management for creators.',
};

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
          <nav className="container-max h-16 flex items-center justify-between">
            <a href="/" className="font-semibold">Creator AI</a>
            <div className="flex items-center gap-3">
              <a className="btn btn-outline" href="/pricing">Pricing</a>
              <a className="btn btn-primary" href="/auth">Login</a>
            </div>
          </nav>
        </header>
        <main className="container-max py-10">{children}</main>
        <footer className="mt-16 border-t py-8 text-sm text-gray-500">
          <div className="container-max">? {new Date().getFullYear()} Creator AI</div>
        </footer>
      </body>
    </html>
  );
}
