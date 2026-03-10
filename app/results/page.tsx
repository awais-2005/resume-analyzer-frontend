/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { FixButton } from "@/components/FixButton";
import { useAnalysis, useResumeContent } from "../context/AnalysisContext";
import { ResumeAnalysis } from "../types/ResumeAnalysis";
import MinimalNavBar from "@/components/MinimalNavBar";
import { useEffect, useState, useCallback } from "react";

// ─── Toggle Button ────────────────────────────────────────────────────────────
function ApplyToggle({ apply, onToggle }: { apply: boolean; onToggle: () => void; }) {
  return (
    <button
      onClick={onToggle}
      title={apply ? "Approved — click to undo" : "Click to approve this suggestion"}
      className={`flex items-center ml-auto gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
        border transition-all duration-200 shrink-0 select-none
        ${apply
          ? "bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm"
          : "bg-gray-50 border-gray-200 text-gray-400 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50"
        }
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full transition-colors ${apply ? "bg-emerald-500" : "bg-gray-300"}`} />
      {apply ? "Approved" : "Approve"}
    </button>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ title, approved, total }: { title: string; approved: number; total: number }) {
  return (
    <div className="flex items-center gap-3">
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      {total > 0 && (
        <span className="flex shrink-0 text-xs text-gray-400 font-medium">
          <span className="text-emerald-600 font-semibold">{approved}</span> / {total} approved
        </span>
      )}
    </div>
  );
}

// ─── Approve All Button ───────────────────────────────────────────────────────
function ApproveAllButton({ allApproved, onToggleAll }: { allApproved: boolean; onToggleAll: () => void }) {
  return (
    <button
      onClick={onToggleAll}
      className={`flex shrink-0 sm:text-sm text-[0.68rem] px-3 py-1.5 rounded-sm border font-medium transition-all duration-200
        ${allApproved
          ? "bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
          : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700"
        }
      `}
    >
      {allApproved ? "Revoke All" : "Approve All"}
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ResultsPage() {
  const [result, setResult] = useState<ResumeAnalysis | null>(
    useAnalysis((state) => state.analysis)
  );
  const resumeContent = useResumeContent((state) => state.resumeContent);

  // Persist to localStorage
  useEffect(() => {
    if (result) localStorage.setItem("result", JSON.stringify(result));
  }, [result]);

  console.log("Current result state:", result);

  // Rehydrate from localStorage
  useEffect(() => {
    const str = localStorage.getItem("result");
    if (!result && str) {
      try { setResult(JSON.parse(str)); } catch { /* ignore */ }
    }
  }, [result]);

  // ── Generic field-level toggle ──────────────────────────────────────────────
  const toggleApply = useCallback(
    <K extends keyof ResumeAnalysis>(field: K, index: number) => {
      setResult((prev) => {
        if (!prev) return prev;
        const arr = [...(prev[field] as { apply: boolean }[])];
        arr[index] = { ...arr[index], apply: !arr[index].apply };
        return { ...prev, [field]: arr };
      });
    },
    []
  );

  const toggleAll = useCallback(
    <K extends keyof ResumeAnalysis>(field: K, value: boolean) => {
      setResult((prev) => {
        if (!prev) return prev;
        const arr = (prev[field] as { apply: boolean }[]).map((item) => ({ ...item, apply: value }));
        return { ...prev, [field]: arr };
      });
    },
    []
  );

  const approvedCount = <T extends { apply: boolean }>(arr: T[]) =>
    arr.filter((i) => i.apply).length;

  const allApproved = <T extends { apply: boolean }>(arr: T[]) =>
    arr.length > 0 && arr.every((i) => i.apply);

  // ── Early returns ───────────────────────────────────────────────────────────
  if (!result) {
    return (
      <>
        <MinimalNavBar />
        <section className="py-10 bg-gray-50/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900">404</h3>
            <p className="mt-2 text-gray-600">Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
          </div>
        </section>
      </>
    );
  }

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const getScoreColor = (s: number) => s >= 80 ? "text-emerald-600" : s >= 60 ? "text-yellow-500" : "text-red-500";
  const getScoreRingColor = (s: number) => s >= 80 ? "stroke-emerald-500" : s >= 60 ? "stroke-yellow-400" : "stroke-red-400";
  const getScoreBg = (s: number) => s >= 80 ? "bg-emerald-50 border-emerald-200" : s >= 60 ? "bg-yellow-50 border-yellow-200" : "bg-red-50 border-red-200";
  const getGradeColor = (g: string) => {
    if (g.startsWith("A")) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (g.startsWith("B")) return "text-blue-600 bg-blue-50 border-blue-200";
    if (g.startsWith("C")) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const overallScore = result.overallScore;
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (overallScore / 100) * circumference;

  const scoreCards = [
    { label: "ATS Compatibility", score: result.atsScore },
    { label: "Formatting", score: result.formattingScore },
    { label: "Keywords", score: result.keywordScore },
    { label: "Impact & Action", score: result.impactScore },
    { label: "Clarity & Conciseness", score: result.clarityScore },
    { label: "Creativity & Uniqueness", score: result.creativityScore },
  ];

  // Total approved count across all approvable sections
  const totalApproved =
    approvedCount(result.grammarIssues) +
    approvedCount(result.impactUpgrades) +
    approvedCount(result.creativityBoosts) +
    approvedCount(result.keywordSuggestions) +
    approvedCount(result.formattingTips) +
    approvedCount(result.redFlags);

  const totalSuggestions =
    result.grammarIssues.length +
    result.impactUpgrades.length +
    result.creativityBoosts.length +
    result.keywordSuggestions.length +
    result.formattingTips.length +
    result.redFlags.length;

  return (
    <>
      <MinimalNavBar />
      <FixButton />
      <section className="py-10 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Page Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Analysis <span className="text-emerald-600">Results</span>
            </h2>
            <p className="mt-3 text-gray-600">Here&apos;s how your resume scored</p>
          </div>

          {/* Overall Score Ring + Grade */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="relative w-36 h-36 shrink-0">
                <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  <circle
                    cx="60" cy="60" r="54" fill="none"
                    className={getScoreRingColor(overallScore)}
                    strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}</span>
                  <span className="text-xs text-gray-400">out of 100</span>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <h3 className="text-xl font-bold text-gray-900">Overall Score</h3>
                  <span className={`px-3 py-1 rounded-lg border text-sm font-bold ${getGradeColor(result.grade)}`}>
                    Grade: {result.grade}
                  </span>
                </div>
                <p className="text-gray-600 mt-2 text-justify">{result.overallFeedback}</p>
              </div>
            </div>
          </div>

          {/* Score Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {scoreCards.map((card) => (
              <div key={card.label} className={`rounded-xl border p-5 text-center ${getScoreBg(card.score)}`}>
                <p className={`text-2xl font-bold ${getScoreColor(card.score)}`}>{card.score}%</p>
                <p className="text-sm text-gray-600 mt-1 font-medium">{card.label}</p>
              </div>
            ))}
          </div>

          {/* Approval Summary Banner */}
          {totalSuggestions > 0 && (
            <div className="bg-linear-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-2xl p-4 mb-8 md:text-sm flex items-center justify-between gap-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <p>Suggestions Approved:</p>
                  <div>
                    <span className="text-emerald-600">{totalApproved}</span>
                    <span className="text-gray-400"> / {totalSuggestions}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  Approve the fixes you want applied when polishing your resume
                </p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={() => {
                    (["grammarIssues", "impactUpgrades", "creativityBoosts", "keywordSuggestions", "formattingTips", "redFlags"] as const)
                      .forEach((f) => toggleAll(f, true));
                  }}
                  className="text-xs px-3 py-1.5 rounded-lg border font-medium bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 transition-colors"
                >
                  Approve All
                </button>
                <button
                  onClick={() => {
                    (["grammarIssues", "impactUpgrades", "creativityBoosts", "keywordSuggestions", "formattingTips", "redFlags"] as const)
                      .forEach((f) => toggleAll(f, false));
                  }}
                  className="text-xs px-3 py-1.5 rounded-lg border font-medium bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-600 transition-colors"
                >
                  Revoke All
                </button>
              </div>
            </div>
          )}

          {/* Strengths & Weaknesses */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Strengths
              </h3>
              <ul className="space-y-2">
                {result.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" /> Weaknesses
              </h3>
              <ul className="space-y-2">
                {result.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recruiter Verdict */}
          <div className="bg-emerald-50 rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Recruiter Verdict</h3>
            <p className="text-gray-700 text-sm italic">&ldquo;{result.recruiterVerdict}&rdquo;</p>
          </div>

          {/* ── Impact Upgrades ── */}
          {result.impactUpgrades.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
              <div className="flex items-center mb-4 gap-3">
                <SectionHeader
                  title="Impact Upgrades"
                  approved={approvedCount(result.impactUpgrades)}
                  total={result.impactUpgrades.length}
                />
                <ApproveAllButton
                  allApproved={allApproved(result.impactUpgrades)}
                  onToggleAll={() => toggleAll("impactUpgrades", !allApproved(result.impactUpgrades))}
                />
              </div>
              <ul className="space-y-3">
                {result.impactUpgrades.map((upgrade, i) => (
                  <li
                    key={i}
                    className={`rounded-xl border p-4 transition-colors ${upgrade.apply ? "border-emerald-200 bg-emerald-50/50" : "border-gray-100 bg-gray-50/50"
                      }`}
                  >
                    <div className="flex flex-col items-start justify-between gap-3">
                      <ApplyToggle apply={upgrade.apply} onToggle={() => toggleApply("impactUpgrades", i)} />
                      <div className="flex flex-col gap-1.5 text-sm flex-1 min-w-0">
                        <span className="text-red-500 line-through bg-red-50 border border-red-100 rounded-md py-1.5 px-3">{upgrade.original}</span>
                        <span className="text-emerald-700 font-medium bg-emerald-50 border border-emerald-200 rounded-md py-1.5 px-3">{upgrade.upgraded}</span>
                        <span className="text-gray-400 text-xs">{upgrade.reason}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── Grammar Issues ── */}
          {result.grammarIssues.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
              <div className="flex items-center mb-4 gap-3">
                <SectionHeader
                  title="Grammar Issues"
                  approved={approvedCount(result.grammarIssues)}
                  total={result.grammarIssues.length}
                />
                <ApproveAllButton
                  allApproved={allApproved(result.grammarIssues)}
                  onToggleAll={() => toggleAll("grammarIssues", !allApproved(result.grammarIssues))}
                />
              </div>
              <div className="space-y-3">
                {result.grammarIssues.map((issue, i) => {
                  const severityColor =
                    issue.severity === "critical" ? "border-red-300 bg-red-50/60" :
                      issue.severity === "moderate" ? "border-yellow-200 bg-yellow-50/60" :
                        "border-gray-200 bg-gray-50/60";
                  const severityBadge =
                    issue.severity === "critical" ? "bg-red-100 text-red-700 border-red-200" :
                      issue.severity === "moderate" ? "bg-yellow-100 text-yellow-700 border-yellow-200" :
                        "bg-gray-100 text-gray-600 border-gray-200";
                  return (
                    <div
                      key={i}
                      className={`rounded-xl border p-4 transition-colors ${issue.apply ? "border-emerald-200 bg-emerald-50/50" : severityColor
                        }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-col gap-1.5 text-sm flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium capitalize ${severityBadge}`}>
                              {issue.severity}
                            </span>
                            <span className="text-gray-400 text-xs">{issue.context}</span>
                          </div>
                          <span className="line-through text-red-500 bg-red-50 border border-red-100 rounded-md py-1.5 px-3">{issue.original}</span>
                          <span className="text-emerald-700 font-medium bg-emerald-50 border border-emerald-200 rounded-md py-1.5 px-3">{issue.suggestion}</span>
                        </div>
                        <ApplyToggle apply={issue.apply} onToggle={() => toggleApply("grammarIssues", i)} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Creativity Boosts ── */}
          {result.creativityBoosts.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
              <div className="flex items-center mb-4 gap-3">
                <SectionHeader
                  title="Creativity Boosts"
                  approved={approvedCount(result.creativityBoosts)}
                  total={result.creativityBoosts.length}
                />
                <ApproveAllButton
                  allApproved={allApproved(result.creativityBoosts)}
                  onToggleAll={() => toggleAll("creativityBoosts", !allApproved(result.creativityBoosts))}
                />
              </div>
              <ul className="space-y-3">
                {result.creativityBoosts.map((boost, i) => (
                  <li
                    key={i}
                    className={`rounded-xl border p-4 transition-colors ${boost.apply ? "border-emerald-200 bg-emerald-50/50" : "border-blue-100 bg-blue-50/30"
                      }`}
                  >
                    <div className="flex flex-col items-start">
                      <ApplyToggle apply={boost.apply} onToggle={() => toggleApply("creativityBoosts", i)} />
                      <div className="flex flex-col gap-1.5 text-sm w-full -mt-4">
                        <span className="text-gray-400 text-xs">{boost.context}</span>
                        <span className="line-through text-red-500 bg-red-50 border border-red-100 rounded-md py-1.5 px-3">{boost.original}</span>
                        <span className="text-blue-700 font-medium bg-blue-50 border border-blue-200 rounded-md py-1.5 px-3">{boost.suggestion}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── Red Flags ── */}
          {result.redFlags.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
              <div className="flex items-center mb-4 gap-3">
                <SectionHeader
                  title="Red Flags"
                  approved={approvedCount(result.redFlags)}
                  total={result.redFlags.length}
                />
                <ApproveAllButton
                  allApproved={allApproved(result.redFlags)}
                  onToggleAll={() => toggleAll("redFlags", !allApproved(result.redFlags))}
                />
              </div>
              <ul className="space-y-3">
                {result.redFlags.map((flag, i) => (
                  <li
                    key={i}
                    className={`rounded-xl border p-4 transition-colors ${flag.apply ? "border-emerald-200 bg-emerald-50/50" : "border-red-200 bg-red-50/40"
                      }`}
                  >
                    <div className="flex flex-col items-start justify-between gap-3">
                      <ApplyToggle apply={flag.apply} onToggle={() => toggleApply("redFlags", i)} />
                      <div className="flex flex-col gap-1 text-sm w-full -mt-4">
                        <span className="text-red-600 font-semibold">{flag.issue}</span>
                        <span className="text-gray-600">{flag.impact}</span>
                        <span className="text-emerald-700 font-medium mt-1">Fix: {flag.fix}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── Missed Opportunities ── */}
          {result.missedOpportunities.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Missed Opportunities</h3>
              <ul className="space-y-2">
                {result.missedOpportunities.map((missed, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                    {missed}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── Keyword Suggestions & Formatting Tips ── */}
          <div className="flex flex-col lg:flex-row gap-6 mb-8">

            {/* Keywords */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <SectionHeader
                  title="Keyword Suggestions"
                  approved={approvedCount(result.keywordSuggestions)}
                  total={result.keywordSuggestions.length}
                />
                <ApproveAllButton
                  allApproved={allApproved(result.keywordSuggestions)}
                  onToggleAll={() => toggleAll("keywordSuggestions", !allApproved(result.keywordSuggestions))}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {result.keywordSuggestions.map((kw, i) => (
                  <button
                    key={i}
                    onClick={() => toggleApply("keywordSuggestions", i)}
                    title={kw.evidenceFrom ? `Evidence: "${kw.evidenceFrom}"` : kw.reason}
                    className={`
                      px-3 py-1.5 rounded-full border text-sm font-medium transition-all duration-200
                      ${kw.apply
                        ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                        : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700"
                      }
                    `}
                  >
                    {kw.apply && <span className="mr-1">✓</span>}
                    {kw.keyword}
                  </button>
                ))}
              </div>
              {result.keywordSuggestions.some(k => k.evidenceFrom) && (
                <p className="text-xs text-gray-400 mt-3">Hover a keyword to see why it was suggested</p>
              )}
            </div>

            {/* Formatting Tips */}
            {result.formattingTips.length > 0 && (<div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <SectionHeader
                  title="Formatting Tips"
                  approved={approvedCount(result.formattingTips)}
                  total={result.formattingTips.length}
                />
                <ApproveAllButton
                  allApproved={allApproved(result.formattingTips)}
                  onToggleAll={() => toggleAll("formattingTips", !allApproved(result.formattingTips))}
                />
              </div>
              <ul className="space-y-2">
                {result.formattingTips.map((tip, i) => (
                  <li
                    key={i}
                    className={`flex items-start justify-between gap-2 text-sm rounded-lg px-3 py-2 border transition-colors ${tip.apply ? "border-emerald-200 bg-emerald-50/50 text-emerald-800" : "border-gray-100 bg-gray-50/50 text-gray-700"
                      }`}
                  >
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${tip.apply ? "bg-emerald-500" : "bg-blue-400"}`} />
                      <div>
                        <p>{tip.tip}</p>
                        {tip.reason && <p className="text-xs text-gray-400 mt-0.5">{tip.reason}</p>}
                      </div>
                    </div>
                    <ApplyToggle apply={tip.apply} onToggle={() => toggleApply("formattingTips", i)} />
                  </li>
                ))}
              </ul>
            </div>)}
          </div>

          {/* ── Candidate Persona ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Candidate Persona</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Archetype", value: result.candidatePersona.archetype },
                { label: "Tone", value: result.candidatePersona.tone },
                { label: "Standout Factor", value: result.candidatePersona.standoutFactor },
                { label: "Hiring Risk", value: result.candidatePersona.hiringRisk },
              ].map(({ label, value }) => (
                <div key={label} className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                  <p className="text-sm text-gray-800 font-semibold mt-0.5 capitalize">{value}</p>
                </div>
              ))}
              <div className="sm:col-span-2 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Risk Reason</p>
                <p className="text-sm text-gray-800 mt-0.5">{result.candidatePersona.hiringRiskReason}</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
