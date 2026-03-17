import { IApiResponse, SummaryAndBufferResponse } from "../types/Api";
import { ResumeMetadata } from "../types/Resume";
import { ResumeAnalysis } from "../types/ResumeAnalysis";

async function parseResponse<T>(response: Response): Promise<IApiResponse<T>> {
    return await response.json();
}

export async function fetchData<T>(url: string, formData: FormData): Promise<IApiResponse<T>> {

    let response;
    try {
        response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${url}`, {
            method: 'POST',
            body: formData,
        });
    } catch (error) {
        console.log("API called Failed. Error:", error);
        if (error instanceof Error) {
            throw error;
        } else if (typeof error === 'string') {
            throw new Error(error);
        } else {
            throw new Error(`Unknown error is triggered on ${process.env.NEXT_PUBLIC_SERVER_URL}${url}`);
        }
    }
    return await response.json();
}

export async function getResumeContent(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('resume', file);
    const response = await fetchData<ResumeMetadata>("/resume/metadata", formData);
    return response.data.content;
}

export async function analyzeResume(resumeContent: string): Promise<ResumeAnalysis> {
    const formData = new FormData();
    formData.append("resumeContent", resumeContent);
    const response = await fetchData<ResumeAnalysis>("/resume/analysis", formData);
    return response.data;
}

export async function generateImprovedResume(resumeContent: string, analysis: ResumeAnalysis): Promise<SummaryAndBufferResponse> {
    const formData = new FormData();
    formData.append("resumeContent", resumeContent);
    formData.append("analysis", JSON.stringify(analysis));
    const response = await fetchData<SummaryAndBufferResponse>("/resume/generate", formData);

    /*
    Expected response format:
    {
        success: true,
        data: {
            polishSummary: {
                changesApplied: [Array],
                scoreImprovementAreas: [Array],
                atsKeywordsInjected: [Array],
                estimatedNewScore: 92
            },
            buffer: {
                type: 'Buffer',
                data: []
            }
        },
        message: 'Resume generated successfully.',
        timestamp: '2026-03-09T12:55:55.304Z'
    }
    */

    return response.data;
}
