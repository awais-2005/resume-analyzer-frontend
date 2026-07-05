import { PolishSummary } from "./Resume";



export interface IApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
    timestamp: string;
}

export interface IApiError {
    statusCode: number;
    message: string;
}

export interface SummaryAndBufferResponse {
    polishSummary: PolishSummary;
    buffer: ResumeBuffer;
    historyId?: string;
    fixedResumeUrl?: string;
}

export interface ChatResponse {
    response: string;
    context: string;
}

export interface TaskHistoryResponse {
    items: TaskHistoryItem[];
}

export interface ResumeBuffer {
    type: 'Buffer';
    mimeType: string;
    data: number[];
}

export interface TaskHistoryItem {
    id: string;
    title: string;
    prevScore: number;
    newScore?: number | null;
    unfixedResume: string;
    fixedResume?: string | null;
    timestamp: string;
}

