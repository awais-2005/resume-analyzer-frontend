import { create } from "zustand";
import { ResumeAnalysisWithHistory } from "../types/ResumeAnalysis";

interface AnalysisState {
  analysis: ResumeAnalysisWithHistory | null;
  setAnalysis: (analysis: ResumeAnalysisWithHistory) => void;
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
  setResumeContent: (content) => {
    return set({ resumeContent: content })
  },
}));
