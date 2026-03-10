import { create } from "zustand";
import { ResumeAnalysis } from "../types/ResumeAnalysis";

interface AnalysisState {
  analysis: ResumeAnalysis | null;
  setAnalysis: (analysis: ResumeAnalysis) => void;
}

interface ResumeContentState {
  resumeContent: string;
  setResumeContent: (content: string) => void;
}

export const useAnalysis = create<AnalysisState>((set) => ({
  analysis: null,
  setAnalysis: (analysis) => set({ analysis }),
}));

export const useResumeContent = create<ResumeContentState>((set) => ({
  resumeContent: "",
  setResumeContent: (content) => set({ resumeContent: content }),
}));
