# Handoff Context

## Current Goal
Audit and repair frontend/backend API contract drift for the Resume Analyzer frontend, using the backend source in `E:\JS Backend\resumeAi` as ground truth.

## What Has Been Verified
### Backend contract facts
- `POST /auth/register` expects JSON body `{ name, email, password }` and returns `{ token, user }` inside the normal `ApiResponse` envelope.
- `POST /auth/login` expects JSON body `{ email, password }` and returns `{ token, user }` inside `ApiResponse`.
- `GET /auth/google` is a redirect flow handled by Passport.
- `GET /auth/google/callback` redirects to `FRONTEND_URL/auth/callback?token=...`.
- `POST /resume/analysis` expects multipart form-data with file field `resume`.
- `GET /resume/history` returns `{ items: TaskHistoryItem[] }` inside `ApiResponse`.
- `POST /resume/generate` expects `multipart/form-data` parsed by `uploadNone`, with text fields:
  - `templateId` as a string
  - `analysis` as a stringified object or object
  - the backend reads `analysis.historyId` and `analysis.resumeContent`
- `POST /test/chat` expects JSON body `{ message, context }` and returns `{ response, context }` inside `ApiResponse`.
- `GET /test/pdf` returns an `ApiResponse<Buffer>`.
- `POST /test/r2-upload` expects multipart form-data file field `resume`.
- `GET /test/userhistory` returns the same `TaskHistoryResponse` shape as `/resume/history`.

### Backend object shapes resolved from source
- `ResumeAnalysisWithHistory` = `ResumeAnalysis` plus optional `historyId` and optional `resumeContent`.
- `SummaryAndBufferResponse` = `{ polishSummary, buffer, historyId?, fixedResumeUrl? }`.
- `PolishSummary` = `{ changesApplied, scoreImprovementAreas, atsKeywordsInjected, estimatedNewScore }`.
- `ResumeBuffer` = `{ type: 'Buffer', mimeType: string, data: number[] }`.
- `TaskHistoryItem` = `{ id, title, prevScore, newScore?, unfixedResume, fixedResume?, timestamp }`.
- `ApiResponse<T>` always includes `success`, `data`, `message`, and `timestamp`.

## Frontend Changes Already Made
### Updated files
- `app/utils/serverRequests.ts`
- `app/download/page.tsx`
- `tests/testing.ts`

### Fixes applied
- Changed `generateImprovedResume(...)` to send JSON to `POST /resume/generate` instead of multipart form-data.
- The request now sends:
  - `templateId`
  - `analysis` with `resumeContent` embedded inside it
- Added an early guard so `generateImprovedResume(...)` fails if `historyId` or `resumeContent` is missing.
- Added error handling in `app/download/page.tsx` so loading state clears on failure.
- Updated `tests/testing.ts` to create a real `File` from `mockDocxBuffer` instead of passing a raw string to `analyzeResume(...)`.

### Validation already run
- Type/error checks passed for:
  - `app/utils/serverRequests.ts`
  - `app/download/page.tsx`
  - `tests/testing.ts`

## Important Remaining Work
1. Decide whether `Backend.md` should be updated to reflect the real backend schema for `/resume/generate`, `/resume/history`, and the `ApiResponse` envelope.
2. If the goal is full frontend/backend drift cleanup, re-scan the frontend for any remaining stale assumptions around:
   - `SummaryAndBufferResponse`
   - `PolishSummary`
   - `TaskHistoryItem`
   - any auth token payload assumptions in `useAuth.ts`
3. Consider whether `tests/testing.ts` should remain as a debug script or be removed if it is not part of normal workflows.

## Files Worth Reading First
- `Backend.md`
- `app/utils/serverRequests.ts`
- `app/download/page.tsx`
- `app/results/page.tsx`
- `app/context/HistoryContext.ts`
- `components/HistoryDrawer.tsx`
- `components/ResumeUpload.tsx`
- `app/auth/login/page.tsx`
- `app/auth/register/page.tsx`
- `app/auth/callback/page.tsx`
- `app/hooks/useAuth.ts`

## Notes for the Next Agent
- The backend source in `E:\JS Backend\resumeAi` is authoritative when `Backend.md` conflicts with code.
- There are no validation schemas in the backend; object shapes come from TypeScript interfaces and controller field access.
- The biggest live drift that was fixed was `/resume/generate`.
- If you continue with docs cleanup, keep `context.md` as the handoff source and update `Backend.md` only after confirming the desired documentation target.
