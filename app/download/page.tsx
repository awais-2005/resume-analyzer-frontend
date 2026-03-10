"use client";

import MinimalNavBar from "@/components/MinimalNavBar";
import { useMemo } from "react";
import { PolishSummary } from "../types/Resume";

export default function DownloadPage() {



    const polishSummary: PolishSummary | null = useMemo(() => {
        const summaryStr = typeof window !== "undefined" ? localStorage.getItem("polishSummary") : null;
        return summaryStr ? JSON.parse(summaryStr) : null;
    }, []);

    const docxBuffer: ArrayBuffer | null = useMemo(() => {
        const bufferStr = typeof window !== "undefined" ? localStorage.getItem("docxBuffer") : null;
        if (bufferStr) {
            const arr = JSON.parse(bufferStr);
            return new Uint8Array(arr).buffer;
        }
        return null;
    }, []);

    const downloadDocx = () => {
        if (!docxBuffer) return;
        const blob = new Blob([docxBuffer], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Improved_Resume.docx";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <>
            <MinimalNavBar />
            <section className="py-10 bg-gray-50/50 min-h-screen">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8 text-center">
                        <h2 className="text-3xl font-bold text-emerald-600 mb-4">Resume Improved!</h2>
                        <p className="text-gray-700 mb-6">Your resume has been polished and is ready for download.</p>
                        <button
                            className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-bold text-lg shadow hover:bg-emerald-700 transition"
                            onClick={downloadDocx}
                            disabled={!docxBuffer}
                        >
                            Download Improved Resume
                        </button>
                    </div>

                    {polishSummary && (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Polish Summary</h3>
                            <ul className="mb-4">
                                <li className="mb-2 text-sm text-gray-700"><span className="font-semibold">Estimated New Score:</span> {polishSummary.estimatedNewScore}</li>
                                <li className="mb-2 text-sm text-gray-700"><span className="font-semibold">Score Improvement Areas:</span> {polishSummary.scoreImprovementAreas.join(", ")}</li>
                                <li className="mb-2 text-sm text-gray-700"><span className="font-semibold">ATS Keywords Injected:</span> {polishSummary.atsKeywordsInjected.join(", ")}</li>
                            </ul>
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 mb-2">Changes Applied</h4>
                                <ul className="space-y-2">
                                    {polishSummary.changesApplied.map((change, i) => (
                                        <li key={i} className="text-sm text-gray-700">{change}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
