import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "My Blog",
  description: "A modern blog built with Next.js + WordPress REST API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {/* Header / Navbar */}
        <header className="bg-white shadow">
          <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              My Blog
            </Link>
            <div className="space-x-6">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              <Link href="/about" className="hover:text-blue-600">
                About
              </Link>
              <Link href="/contact" className="hover:text-blue-600">
                Contact
              </Link>
              <Link href="/posts" className="hover:text-blue-600">
                Blog
              </Link>
            </div>
          </nav>
        </header>

        {/* Page Content */}
        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 mt-10">
          <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">My Blog</h3>
              <p className="text-sm">
                Built with Next.js frontend + WordPress REST API backend.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/posts" className="hover:underline">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Follow Us
              </h3>
              <p className="text-sm">
                Stay updated via{" "}
                <a
                  href="https://twitter.com/yourprofile"
                  target="_blank"
                  className="text-blue-400 hover:underline"
                >
                  Twitter
                </a>{" "}
                and{" "}
                <a
                  href="https://github.com/yourprofile"
                  target="_blank"
                  className="text-blue-400 hover:underline"
                >
                  GitHub
                </a>
                .
              </p>
            </div>
          </div>
          <div className="text-center py-4 border-t border-gray-700 text-sm">
            © {new Date().getFullYear()} My Blog. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
