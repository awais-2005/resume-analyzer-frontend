import { PolishSummary } from "./Resume";



export interface IApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
    timestamp: string;
}

export interface IApiError {
    success: boolean;
    message: string;
}

export interface SummaryAndBufferResponse {
    polishSummary: PolishSummary;
    buffer: ResumeBuffer;
}

export interface ResumeBuffer {
    type: 'Buffer';
    mimeType: string;
    data: number[];
}

