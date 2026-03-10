import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-white via-emerald-50/40 to-white flex flex-col">
      {/* Minimal Navbar */}
      <nav className="bg-white border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Resume<span className="text-emerald-600">AI</span>
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* 404 Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* Animated badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
            Page Not Found
          </div>

          {/* Big 404 */}
          <h1 className="text-8xl sm:text-9xl font-bold text-emerald-600/20 leading-none select-none">
            404
          </h1>

          {/* Icon */}
          <div className="mt-4 mx-auto w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6" className="text-red-400" stroke="currentColor" opacity="0.5" />
            </svg>
          </div>

          <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-gray-900">
            Oops! This page doesn&apos;t exist
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            The page you&apos;re looking for might have been moved, deleted, or never existed. 
            Let&apos;s get you back on track.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-0.5"
            >
              Back to Home
            </Link>
            <Link
              href="/#upload"
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-8 py-3 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
            >
              Analyze a Resume
            </Link>
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="py-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} ResumeAI. All rights reserved.
      </footer>
    </div>
  );
}
