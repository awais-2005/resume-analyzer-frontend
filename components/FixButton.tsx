"use client";

import { useAnalysis, useResumeContent } from "@/app/context/AnalysisContext";
import { ResumeAnalysis } from "@/app/types/ResumeAnalysis";
import { MdAutoFixHigh } from "react-icons/md";
import { Spinner } from "./Spinner";

import React from "react";

export function FixButton() {
  const { analysis } = useAnalysis() as { analysis: ResumeAnalysis };
  let { resumeContent } = useResumeContent() as { resumeContent: string };
  const [loading, setLoading] = React.useState(false);
  const router = require("next/navigation").useRouter();
  const [error, setError] = React.useState<string | null>(null);

  const handleClick = async () => {
    if (!analysis) return;
    setLoading(true);
    setError(null);
    try {
      // Get resume content from localStorage
      resumeContent = resumeContent || localStorage.getItem("resumeContent") || "";
      if (!resumeContent) {
        setError("Resume content not found.");
        setLoading(false);
        return;
      }
      const { generateImprovedResume } = await import("@/app/utils/serverRequests");
      const response = await generateImprovedResume(resumeContent, analysis);
      console.log("Response for generating docx:", response);
      if (!response) {
        console.log("No response received from server.");
        throw new Error("No response received from server.");
      }
      // Store polishSummary and docxBuffer in localStorage
      localStorage.setItem("polishSummary", JSON.stringify(response.polishSummary));
      localStorage.setItem("docxBuffer", JSON.stringify(response.buffer.data));
      router.push("/download");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fix resume.");
    }
    setLoading(false);
  };

  const action = {
    clicked:
      "text-emerald-600 bg-emerald-100 cursor-not-allowed border border-emerald-200",
    unclicked:
      "text-emerald-50 hover:text-emerald-100 bg-emerald-600 hover:bg-emerald-700",
  };

  return (
    <>
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ease-in-out z-50 fixed bottom-10 right-10 overflow-hidden ${loading ? action.clicked : action.unclicked}`}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? (
          <Spinner className="w-3 h-3 animate-spin shrink-0" />
        ) : (
          <MdAutoFixHigh className="shrink-0" />
        )}
        <span
          className="text-sm font-medium overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxWidth: loading ? "4rem" : "2rem",
            opacity: 1,
          }}
        >
          {loading ? "Fixing..." : "Fix"}
        </span>
      </button>
      {error && (
        <div className="fixed bottom-24 right-10 bg-red-100 text-red-700 px-4 py-2 rounded shadow-lg z-50">
          {error}
        </div>
      )}
    </>
  );
}
