"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";
import Image from "next/image";
import { History, Menu } from "lucide-react";
import HistoryDrawer from "./HistoryDrawer";
import { useHistoryStore } from "@/app/context/HistoryContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const items = useHistoryStore((state) => state.items);
  const isLoading = useHistoryStore((state) => state.isLoading);
  const error = useHistoryStore((state) => state.error);
  const activeTaskId = useHistoryStore((state) => state.activeTaskId);
  const hydrateHistory = useHistoryStore((state) => state.hydrateHistory);
  const refreshHistory = useHistoryStore((state) => state.refreshHistory);
  const loadHistory = useHistoryStore((state) => state.loadHistory);
  const setActiveTaskId = useHistoryStore((state) => state.setActiveTaskId);
  const closeTask = useHistoryStore((state) => state.closeTask);

  useEffect(() => {
    hydrateHistory();
    loadHistory();
  }, [hydrateHistory, loadHistory]);

  const openHistory = () => {
    setMenuOpen(false);
    setHistoryOpen(true);
  };

  const closeHistory = () => {
    setHistoryOpen(false);
    closeTask();
  };

  const toggleTask = (taskId: string) => {
    setActiveTaskId(activeTaskId === taskId ? null : taskId);
  };

  return (
    <nav className="bg-white border-b border-emerald-100 z-50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
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

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm font-medium">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm font-medium">
              How It Works
            </Link>
            <Link href="#upload" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm font-medium">
              Analyze
            </Link>
            {isLoggedIn && (
              <button
                type="button"
                onClick={openHistory}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors text-sm font-medium"
              >
                <History className="h-4 w-4" />
                History
                {items.length > 0 && (
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[0.65rem] font-semibold text-emerald-700">
                    {items.length}
                  </span>
                )}
              </button>)}
            {!isLoggedIn ? (
              <Link
                href="/auth/login"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  {user?.picture ? (
                    <Image
                      src={user.picture}
                      alt={user.name || "Profile"}
                      className="w-10 h-10 rounded-full object-cover border border-emerald-200"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
                      {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">{user?.name || "User"}</span>
                    <span className="text-xs text-gray-500 max-w-40 truncate">{user?.email}</span>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="border border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-100 text-emerald-700 transition-colors hover:border-emerald-200 hover:bg-emerald-50"
              onClick={openHistory}
              aria-label="Open history"
            >
              <History className="h-4 w-4" />
            </button>
            <button
              className="text-gray-600"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-emerald-50">
            <div className="flex flex-col gap-3 pt-4">
              <Link href="#features" className="text-gray-600 hover:text-emerald-600 text-sm font-medium px-2 py-1">Features</Link>
              <Link href="#how-it-works" className="text-gray-600 hover:text-emerald-600 text-sm font-medium px-2 py-1">How It Works</Link>
              <Link href="#upload" className="text-gray-600 hover:text-emerald-600 text-sm font-medium px-2 py-1">Analyze</Link>
              <button
                type="button"
                onClick={openHistory}
                className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 text-sm font-medium px-2 py-1"
              >
                <History className="h-4 w-4" />
                History
              </button>
              {!isLoggedIn ? (
                <Link
                  href="/auth/login"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors mt-2 text-center"
                >
                  Login
                </Link>
              ) : (
                <>
                  <div className="flex items-center gap-3 px-2 py-3 border-t border-emerald-50">
                    {user?.picture ? (
                      <Image
                        src={user.picture}
                        alt={user.name || "Profile"}
                        className="w-10 h-10 rounded-full object-cover border border-emerald-200"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
                        {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex flex-col flex-1">
                      <span className="text-sm font-semibold text-gray-900">{user?.name || "User"}</span>
                      <span className="text-xs text-gray-500 truncate">{user?.email}</span>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="border border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-5 py-2 rounded-lg text-sm font-medium transition-colors mt-2 w-full"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <HistoryDrawer
        open={historyOpen}
        tasks={items}
        loading={isLoading}
        error={error}
        activeTaskId={activeTaskId}
        onClose={closeHistory}
        handleRefresh={refreshHistory}
        onSelectTask={toggleTask}
        onCloseTask={closeTask}
      />
    </nav>
  );
}
