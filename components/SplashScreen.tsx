"use client";

import React, { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Show splash for 2s, then start fade out
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    // Completely remove after fade out transition (500ms)
    const removeTimer = setTimeout(() => {
      setShouldRender(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
    >
      {/* Text Reveal Animation */}
      <div className="text-3xl mb-2 flex">
        <h1 className="font-bold text-grey-900">
          Resum<span className="text-emerald-500">lyze</span>
        </h1>
        <span className="text-gray-500 text-xs">with AI</span>
      </div>

    </div>
  );
}
