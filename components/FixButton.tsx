"use client";

import { useRouter } from "next/navigation";
import { MdAutoFixHigh } from "react-icons/md";
import { ChevronRight } from "lucide-react";

export function FixButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/fix")}
      className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full
        bg-emerald-600 hover:bg-emerald-700 text-white
        shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300
        transition-all duration-300 ease-in-out
        fixed bottom-8 right-8 z-999"
    >
      <MdAutoFixHigh className="w-4 h-4" />
      <span className="text-sm font-semibold">Fix Resume</span>
      <ChevronRight className="w-4 h-4 opacity-60 group-hover:translate-x-0.5 transition-transform" />
    </button>
  );
}
