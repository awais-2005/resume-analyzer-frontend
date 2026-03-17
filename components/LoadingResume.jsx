"use client";

export function LoadingResume1() {
    return (
        <div className="relative w-72 min-h-96 rounded-xl overflow-hidden border border-emerald-500 mx-auto scale-120 mt-10 sm:scale-100 sm:mt-0">
            <div className="w-full h-full bg-white p-6 flex flex-col gap-3">

                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-400 shrink-0"></div>
                    <div className="flex flex-col gap-2 flex-1">
                        <div className="h-3 w-3/4 bg-gray-500 rounded"></div>
                        <div className="h-2 w-1/2 bg-gray-300 rounded"></div>
                    </div>
                </div>

                <div className="h-px bg-gray-200"></div>

                <div className="flex flex-col gap-2">
                    <div className="h-2.5 w-1/3 bg-gray-500 rounded"></div>
                    <div className="h-2 w-full bg-gray-300 rounded"></div>
                    <div className="h-2 w-11/12 bg-gray-300 rounded"></div>
                    <div className="h-2 w-4/5 bg-gray-300 rounded"></div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="h-2.5 w-2/5 bg-gray-500 rounded"></div>
                    <div className="flex justify-between">
                        <div className="h-2 w-1/2 bg-gray-300 rounded"></div>
                        <div className="h-2 w-1/4 bg-gray-300 rounded"></div>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded"></div>
                    <div className="h-2 w-11/12 bg-gray-200 rounded"></div>
                    <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="h-2.5 w-1/4 bg-gray-500 rounded"></div>
                    <div className="flex flex-wrap gap-2">
                        <div className="h-5 w-14 bg-gray-300 rounded-full"></div>
                        <div className="h-5 w-16 bg-gray-300 rounded-full"></div>
                        <div className="h-5 w-12 bg-gray-300 rounded-full"></div>
                        <div className="h-5 w-20 bg-gray-300 rounded-full"></div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="h-2.5 w-1/3 bg-gray-500 rounded"></div>
                    <div className="flex justify-between">
                        <div className="h-2 w-3/5 bg-gray-300 rounded"></div>
                        <div className="h-2 w-1/5 bg-gray-300 rounded"></div>
                    </div>
                    <div className="h-2 w-2/5 bg-gray-300 rounded"></div>
                </div>

            </div>

            <div className="glass absolute inset-0 rounded-xl border border-white/50 bg-white/20 overflow-hidden">
                <div className="shimmer"></div>
                <div className="scanline"></div>
                <div className="spark s1"></div>
                <div className="spark s2"></div>
                <div className="spark s3"></div>
                <div className="spark s4"></div>
            </div>

        </div>
    )
}

import { useEffect } from "react";

const css = `
  @keyframes shimmer {
    0%   { left: -100%; }
    100% { left: 160%; }
  }
  @keyframes scanline {
    0%   { top: -2%; opacity: 0.8; }
    100% { top: 102%; opacity: 0; }
  }
  @keyframes spark {
    0%, 100% { opacity: 0; transform: scale(0.4); }
    50%       { opacity: 1; transform: scale(1.3); }
  }
  @keyframes blurPulse {
    0%, 100% { backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
    50%       { backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px); }
  }

  .shimmer-bar {
    position: absolute; top: 0; bottom: 0; width: 80px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
    animation: shimmer 2.5s ease-in-out infinite;
    pointer-events: none;
  }
  .scanline {
    position: absolute; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent);
    animation: scanline 2.8s linear infinite;
    pointer-events: none;
  }
  .glass-overlay {
    animation: blurPulse 4s ease-in-out infinite;
  }
  .corner-spark {
    position: absolute; width: 7px; height: 7px;
    border-radius: 9999px; background: white;
    box-shadow: 0 0 8px 4px rgba(255,255,255,0.9);
  }
  .spark-tl { top: -3px; left: -3px;  animation: spark 2s infinite 0.0s; }
  .spark-tr { top: -3px; right: -3px; animation: spark 2s infinite 0.5s; }
  .spark-bl { bottom: -3px; left: -3px;  animation: spark 2s infinite 1.0s; }
  .spark-br { bottom: -3px; right: -3px; animation: spark 2s infinite 1.5s; }
`;

export function LoadingResume2() {
    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = css;
        style.id = "loading-resume-styles";
        if (!document.getElementById("loading-resume-styles")) {
            document.head.appendChild(style);
        }
        return () => {
            document.getElementById("loading-resume-styles")?.remove();
        };
    }, []);

    return (
        <div style={{ position: "relative", width: "340px", height: "460px", padding: "20px 10px", boxSizing: "border-box", borderRadius: "12px", border: "1.5px solid #e5e7eb", background: "#fff", overflow: "hidden", margin: "0 auto" }}>

            {/* Dummy Resume */}
            <div style={{ width: "100%", height: "100%", background: "#d1fae9", padding: "28px 24px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "12px" }}>

                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "9999px", background: "#064e3b", flexShrink: 0 }}></div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                        <div style={{ height: "12px", width: "70%", background: "#50c878", borderRadius: "4px" }}></div>
                        <div style={{ height: "8px", width: "50%", background: "#50c878", borderRadius: "4px" }}></div>
                    </div>
                </div>

                <div style={{ height: "1px", background: "#e5e7eb" }}></div>

                {/* Summary */}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <div style={{ height: "9px", width: "35%", background: "#064e3b", borderRadius: "4px" }}></div>
                    <div style={{ height: "7px", width: "100%", background: "#50c878", borderRadius: "4px" }}></div>
                    <div style={{ height: "7px", width: "95%", background: "#50c878", borderRadius: "4px" }}></div>
                    <div style={{ height: "7px", width: "80%", background: "#50c878", borderRadius: "4px" }}></div>
                </div>

                {/* Experience */}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginTop: "4px" }}>
                    <div style={{ height: "9px", width: "40%", background: "#064e3b", borderRadius: "4px" }}></div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ height: "7px", width: "55%", background: "#50c878", borderRadius: "4px" }}></div>
                        <div style={{ height: "7px", width: "25%", background: "#50c878", borderRadius: "4px" }}></div>
                    </div>
                    <div style={{ height: "7px", width: "100%", background: "#50c878", borderRadius: "4px" }}></div>
                    <div style={{ height: "7px", width: "90%", background: "#50c878", borderRadius: "4px" }}></div>
                    <div style={{ height: "7px", width: "75%", background: "#50c878", borderRadius: "4px" }}></div>
                </div>

                {/* Skills */}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginTop: "4px" }}>
                    <div style={{ height: "9px", width: "30%", background: "#064e3b", borderRadius: "4px" }}></div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {[60, 75, 50, 80, 55].map((w, i) => (
                            <div key={i} style={{ height: "20px", width: `${w}px`, background: "#50c878", borderRadius: "20px" }}></div>
                        ))}
                    </div>
                </div>

                {/* Education */}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginTop: "4px" }}>
                    <div style={{ height: "9px", width: "38%", background: "#064e3b", borderRadius: "4px" }}></div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ height: "7px", width: "60%", background: "#50c878", borderRadius: "4px" }}></div>
                        <div style={{ height: "7px", width: "22%", background: "#50c878", borderRadius: "4px" }}></div>
                    </div>
                    <div style={{ height: "7px", width: "45%", background: "#50c878", borderRadius: "4px" }}></div>
                </div>

            </div>

            {/* Glass Overlay */}
            <div className="glass-overlay" style={{
                position: "absolute", inset: 0,
                backdropFilter: "blur(22px)",
                WebkitBackdropFilter: "blur(22px)",
                background: "rgba(255,255,255,0.25)",
                borderRadius: "12px",
                border: "1.5px solid rgba(255,255,255,0.5)",
                overflow: "hidden",
            }}>
                <div className="shimmer-bar"></div>
                <div className="scanline"></div>
                <div className="corner-spark spark-tl"></div>
                <div className="corner-spark spark-tr"></div>
                <div className="corner-spark spark-bl"></div>
                <div className="corner-spark spark-br"></div>
                <div style={{
                    position: "absolute", bottom: "20px", left: 0, right: 0,
                    textAlign: "center", color: "#064e3b",
                    fontSize: "11px", letterSpacing: "0.15em",
                    textTransform: "uppercase", fontFamily: "sans-serif",
                }}>Fixing Resume…</div>
            </div>

        </div>
    );
}
