import { IApiResponse, SummaryAndBufferResponse, TaskHistoryItem, TaskHistoryResponse } from "../types/Api";
import { ResumeAnalysis, ResumeAnalysisWithHistory } from "../types/ResumeAnalysis";
import { ResumeModel } from "../types/Resume";

export async function fetchData<T>(url: string, formData?: FormData): Promise<IApiResponse<T>> {

    let response: Response | undefined;
    try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const headers: HeadersInit = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const method = formData ? 'POST' : 'GET';
        console.log(`Making API call to ${process.env.NEXT_PUBLIC_SERVER_URL}${url} [${method}]`);
        const fetchOptions: RequestInit = {
            method,
            headers,
        };

        if (formData) {
            fetchOptions.body = formData;
        }

        response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${url}`, fetchOptions);

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.log("API call failed. Response:", errorData);
            throw new Error(`API call to ${url} failed with status ${response.status}${errorData ? `, object: ${JSON.stringify(errorData)}` : ''}`);
        }
    } catch (error) {
        console.log("API call failed. Error:", error);
        if (error instanceof Error) {
            throw error;
        } else if (typeof error === 'string') {
            throw new Error(error);
        } else {
            throw new Error(`Unknown error is triggered on ${process.env.NEXT_PUBLIC_SERVER_URL}${url}`);
        }
    }
    // Type assertion: response is defined when we reach here
    return await response!.json();
}

export async function analyzeResume(resume: File): Promise<ResumeAnalysisWithHistory> {
    const formData = new FormData();
    formData.append("resume", resume);
    const response = await fetchData<ResumeAnalysisWithHistory>("/resume/analysis", formData);
    return response.data;
}

export async function generateImprovedResume(resumeContent: string, analysis: ResumeAnalysisWithHistory, templateId: string): Promise<SummaryAndBufferResponse> {
    if (!analysis.historyId || !analysis.resumeContent) {
        throw new Error("Resume generation requires analysis historyId and resumeContent.");
    }

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/resume/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
            templateId,
            analysis: {
                ...analysis,
                resumeContent,
            },
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(`API call to /resume/generate failed with status ${response.status}${errorData ? `, object: ${JSON.stringify(errorData)}` : ""}`);
    }

    const result = await response.json() as IApiResponse<SummaryAndBufferResponse>;
    return result.data;
}

export async function fetchTaskHistory(): Promise<TaskHistoryItem[]> {
    const response = await fetchData<TaskHistoryResponse>("/resume/history");
    return response.data?.items ?? [];
}

// Fetch the saved analysis snapshot for a past history item, so it can be
// reopened (viewed, or "used" to jump back into the fix/download flow)
// without re-analyzing the resume.
export async function fetchHistoryAnalysis(historyId: string): Promise<ResumeAnalysisWithHistory> {
    const response = await fetchData<ResumeAnalysisWithHistory>(`/resume/history/${historyId}/analysis`);
    return response.data;
}

// Permanently delete a history item.
export async function deleteHistoryItem(historyId: string): Promise<void> {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/resume/history/${historyId}`, {
        method: "DELETE",
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(`API call to /resume/history/${historyId} failed with status ${response.status}${errorData ? `, object: ${JSON.stringify(errorData)}` : ""}`);
    }
}

export async function createResume(data: ResumeModel & { profileImage?: File }, templateId: string): Promise<SummaryAndBufferResponse> {
    const formData = new FormData();
    formData.append("templateId", templateId);

    const { profileImage, ...resumeData } = data;
    formData.append("resumeData", JSON.stringify(resumeData));

    if (profileImage) {
        formData.append("profileImage", profileImage);
    }

    const response = await fetchData<SummaryAndBufferResponse>("/resume/create", formData);
    return response.data;
}
