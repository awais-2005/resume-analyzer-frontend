"use client";

import MinimalNavBar from "@/components/MinimalNavBar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message") || "An unexpected error occurred.";

  return (
    <div className="min-h-[calc(100svh-60px)] bg-linear-to-br from-white via-emerald-50/40 to-white flex flex-col">
      {/* Minimal Navbar */}
      <MinimalNavBar />

      {/* Error Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md w-full px-4">

          {/* Error Icon */}
          <div className="mx-auto w-20 h-20 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-center">
            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>

          <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-gray-900">
            Something Went Wrong
          </h2>

          {/* Specific Error Message */}
          <div className="mt-4 bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-left">
            <p className="text-sm font-medium text-red-800">Error Details</p>
            <p className="mt-1 text-sm text-red-600">{message}</p>
          </div>

          <p className="mt-4 text-gray-500 text-sm leading-relaxed">
            Please try again or go back to the home page.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/#upload"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-0.5"
            >
              Try Again
            </Link>
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

export default function ErrorPage() {
  return (
    <Suspense>
      <ErrorContent />
    </Suspense>
  );
}
