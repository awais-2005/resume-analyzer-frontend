"use client";
import { useAnalysis, useResumeContent } from "@/app/context/AnalysisContext";
import { IApiResponse } from "@/app/types/Api";
import { ResumeAnalysis } from "@/app/types/ResumeAnalysis";
import { analyzeResume, fetchData, getResumeContent } from "@/app/utils/serverRequests";
import { mockATSAnalysis, mockResumeContent } from "@/tests/mock";
import { useRouter } from "next/navigation";
import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { UploadZone } from "./UploadZone";
import { AnalyzeButton } from "./AnalyzeButton";

interface ResumeUploadProps {
  onAnalysisComplete?: (result: ResumeAnalysis) => void;
}

export default function ResumeUpload({ onAnalysisComplete }: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [buttonText, setButtonText] = useState("Analyze Resume");
  const inputRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const setAnalysis = useAnalysis((state) => state.setAnalysis);
  const setResumeContent = useResumeContent((state) => state.setResumeContent);
  const router = useRouter();

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && isValidFile(droppedFile)) {
      setFile(droppedFile);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && isValidFile(selectedFile)) {
      setFile(selectedFile);
    }
  };

  const isValidFile = (f: File): boolean => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    return validTypes.includes(f.type);
  };

  const handleAnalyze = async () => {
    if (!file) {
      console.log("Returning File not found.");
      return;
    };
    let mocktest = true;

    if (!mocktest) {
      // Shows loading...
      setAnalyzing(true);

      let resumeContent: string | undefined;
      try {
        setButtonText("Getting Resume Content...");
        resumeContent = await getResumeContent(file);
      } catch (err) {
        setAnalyzing(false);
        setButtonText("Analyze Resume");
        console.log("ERROR:", err);
        const message = err instanceof Error ? err.message : "Failed to upload resume. Please try again.";
        router.push(`/error-page?message=${encodeURIComponent(message)}`);
        return;
      }

      try {
        if (!resumeContent) throw new Error("Resume content not found.");

        setButtonText("Analyzing Resume...");
        const analysis = await analyzeResume(resumeContent);
        setAnalysis(analysis);
        setResumeContent(resumeContent);
        router.push('/results');
        setAnalyzing(false);
        setButtonText("Analyze Resume");
      } catch (e) {
        setAnalyzing(false);
        const message = e instanceof Error ? e.message : "Failed to analyze resume. Please try again.";
        router.push(`/error-page?message=${encodeURIComponent(message)}`);
      }
    } else {
      // Mock test flow
      setAnalyzing(true);
      setTimeout(() => {
        setAnalysis(mockATSAnalysis);
        setResumeContent(mockResumeContent); // Does not exist yet, but can be added for testing purposes
        router.push('/results');
        setAnalyzing(false);
        setButtonText("Analyze Resume");
      }, 1000);
    }
  };


  const removeFile = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <section id="upload" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Upload Your <span className="text-emerald-600">Resume</span>
          </h2>
          <p className="mt-3 text-gray-600">
            Drag & drop or browse to upload your resume for instant analysis
          </p>
        </div>

        {/* Upload Zone */}
        <UploadZone
          file={file}
          dragActive={dragActive}
          inputRef={inputRef}
          handleDrag={handleDrag}
          handleDrop={handleDrop}
          handleChange={handleChange}
          removeFile={removeFile}
        />

        {/* Analyze Button */}
        <AnalyzeButton
          onClick={handleAnalyze}
          buttonText={buttonText}
          disabled={!file || analyzing}
          analyzing={analyzing}
        />
      </div>
    </section>
  );
}
