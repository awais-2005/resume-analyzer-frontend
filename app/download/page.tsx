"use client";

import MinimalNavBar from "@/components/MinimalNavBar";
import { LoadingResume2 } from "@/components/LoadingResume"
import { useCallback, useEffect, useRef, useState } from "react";
import { PolishSummary } from "../types/Resume";
import { generateImprovedResume } from "../utils/serverRequests";
import { useAnalysis, useResumeContent } from "../context/AnalysisContext";
import { ResumeBuffer } from "../types/Api";
import { mockDocxBuffer, mockPolishSummary } from "@/tests/mock";

export default function DownloadPage() {

    const mockTest = true;

    const getResumeBuffer = useCallback((): ResumeBuffer | null => {
        if (typeof window === "undefined") return null;

        if (mockTest) return {
            type: "Buffer",
            mimeType: "docx",
            data: mockDocxBuffer,
        };

        const bufferStr = localStorage.getItem('buffer');
        return bufferStr ? JSON.parse(bufferStr) as ResumeBuffer : null;
    }, [mockTest]);

    const getSummary = useCallback((): PolishSummary | null => {
        if (typeof window === "undefined") return null;

        if (mockTest) return mockPolishSummary;

        const summaryStr = localStorage.getItem('summary');
        return summaryStr ? JSON.parse(summaryStr) : null;
    }, [mockTest]);

    const { analysis } = useAnalysis();
    const { resumeContent } = useResumeContent();
    const [loading, setLoading] = useState(false);
    const [resumeBuffer, setResumeBuffer] = useState<ResumeBuffer | null>(() => getResumeBuffer());
    const [polishSummary, setPolishSummary] = useState<PolishSummary | null>(() => getSummary());
    const start = useRef<number>(0);

    useEffect(() => {
        if (!polishSummary) return;
        localStorage.setItem('summary', JSON.stringify(polishSummary));
    }, [polishSummary]);

    useEffect(() => {
        if (!resumeBuffer) return;
        localStorage.setItem('buffer', JSON.stringify(resumeBuffer))
    }, [resumeBuffer]);

    useEffect(() => {
        ; (async function () {
            if (mockTest) {
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }

            if (!resumeContent || !analysis) {
                return;
            }
            setLoading(true);
            start.current = Date.now();
            const res = await generateImprovedResume(resumeContent, analysis);
            setPolishSummary(res.polishSummary);
            setResumeBuffer(res.buffer);
            setLoading(false);
            console.log("Time taken:", Date.now() - start.current);
        })();
    }, [analysis, mockTest, resumeContent]);

    const downloadDocx = () => {
        if (!resumeBuffer) return;
        let blob;
        if (resumeBuffer.mimeType === 'docx') {
            blob = new Blob([new Uint8Array(resumeBuffer.data)], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
        } else if (resumeBuffer.mimeType === 'pdf') {
            blob = new Blob([Buffer.from(resumeBuffer.data).buffer], { type: "application/pdf" });
        }

        if (!blob) {
            console.log('Blob is undefined or null BLOB =', blob);
            return;
        }

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Improved_Resume." + resumeBuffer.mimeType.toLowerCase();
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-100svh">
            <MinimalNavBar />
            <section className="py-10 bg-gray-50/50 min-h-[calc(100svh-60px)]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                    {loading && (<LoadingResume2 />)}

                    {!loading && (<div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8 text-center">
                        <h2 className="text-3xl font-bold text-emerald-600 mb-4">Resume Improved!</h2>
                        <p className="text-gray-700 mb-6">{loading ? "Your resume is being generated. Please Wait!" : "Your resume has been polished and is ready for download."}</p>
                        <button
                            className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-bold text-lg shadow hover:bg-emerald-700 transition"
                            onClick={downloadDocx}
                            disabled={loading}
                        >
                            {loading ? "Generating Resume..." : "Download"}
                        </button>
                    </div>)}

                    {!loading && polishSummary && (
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
        </div>
    );
}
