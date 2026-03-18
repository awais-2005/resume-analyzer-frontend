import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      {/* Premium Gradient Background Blur */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative flex flex-col items-center">
        {/* Animated Logo/Icon Container */}
        <div className="relative w-20 h-20 mb-8">
          {/* Outer Ripple Anims */}
          <div className="absolute inset-0 rounded-2xl bg-emerald-500/20 animate-ping" />
          <div className="absolute inset-0 rounded-2xl bg-emerald-500/10 animate-pulse delay-75" />
          
          {/* Main Icon Box */}
          <div className="relative w-full h-full bg-white rounded-2xl border border-emerald-100 shadow-xl shadow-emerald-500/10 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Preparing your <span className="text-emerald-600">experience</span>
          </h2>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.3s]" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.15s]" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Brand Label */}
      <div className="absolute bottom-12 flex items-center gap-2 grayscale opacity-40">
        <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center">
          <span className="text-white text-[10px] font-bold">RA</span>
        </div>
        <span className="text-sm font-semibold tracking-wider uppercase text-gray-900">ResumeArchitect</span>
      </div>
    </div>
  );
}
