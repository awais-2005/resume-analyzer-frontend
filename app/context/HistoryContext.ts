import { create } from "zustand";
import { fetchTaskHistory } from "../utils/serverRequests";
import { TaskHistoryItem } from "../types/Api";

const HISTORY_CACHE_KEY = "resume-ai-history-cache-v1";

interface HistoryState {
    items: TaskHistoryItem[];
    isLoading: boolean;
    error: string | null;
    activeTaskId: string | null;
    hasHydrated: boolean;
    refreshHistory: () => Promise<void>;
    hydrateHistory: () => void;
    loadHistory: () => Promise<void>;
    setActiveTaskId: (id: string | null) => void;
    closeTask: () => void;
}

const readCachedHistory = (): TaskHistoryItem[] => {
    if (typeof window === "undefined") return [];

    const cached = localStorage.getItem(HISTORY_CACHE_KEY);
    if (!cached) return [];

    try {
        const parsed = JSON.parse(cached) as TaskHistoryItem[];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const writeCachedHistory = (items: TaskHistoryItem[]) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(HISTORY_CACHE_KEY, JSON.stringify(items));
};

export const useHistoryStore = create<HistoryState>((set, get) => ({
    items: [],
    isLoading: false,
    error: null,
    activeTaskId: null,
    hasHydrated: false,
    hydrateHistory: () => {
        if (get().hasHydrated) return;

        const cachedItems = readCachedHistory();
        set({
            items: cachedItems,
            hasHydrated: true,
        });
    },
    loadHistory: async () => {
        const state = get();

        if (state.items.length > 0) {
            return;
        }

        if (!state.hasHydrated) {
            const cachedItems = readCachedHistory();
            if (cachedItems.length > 0) {
                set({ items: cachedItems, hasHydrated: true });
                return;
            }
        }

        set({ isLoading: true, error: null, hasHydrated: true });

        try {
            const history = await fetchTaskHistory();
            set({ items: history, isLoading: false, error: null });
            writeCachedHistory(history);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to load history.";
            set({ isLoading: false, error: message });
        }
    },
    setActiveTaskId: (id) => set({ activeTaskId: id }),
    closeTask: () => set({ activeTaskId: null }),
    refreshHistory: async (): Promise<void> => {
        set({ isLoading: true, error: null });
        try {
            const history = await fetchTaskHistory();
            console.log("Fetched history:", history);
            set({ items: history, isLoading: false, error: null });
            writeCachedHistory(history);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to refresh history.";
            set({ isLoading: false, error: message });
        }
    },
}));
