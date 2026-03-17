"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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

      {/* Error Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            Something Went Wrong
          </div>

          {/* Error Icon */}
          <div className="mx-auto w-20 h-20 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-center">
            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>

          <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-gray-900">
            Unexpected Error
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            {error.message || "An unexpected error has occurred. Please try again later."}
          </p>

          {/* Error digest for debugging */}
          {error.digest && (
            <p className="mt-3 text-xs text-gray-400 font-mono bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 inline-block">
              Error ID: {error.digest}
            </p>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-0.5 cursor-pointer"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-8 py-3 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
            >
              Back to Home
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
