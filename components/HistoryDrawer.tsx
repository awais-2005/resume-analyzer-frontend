"use client";

import { TaskHistoryItem } from "@/app/types/Api";
import {
    ArrowRight,
    Check,
    Eye,
    ExternalLink,
    Loader2,
    RotateCcw,
    Trash2,
    X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type HistoryDrawerProps = {
    open: boolean;
    tasks: TaskHistoryItem[];
    loading: boolean;
    error: string | null;
    activeTaskId: string | null;
    pendingTaskId: string | null;
    actionError: string | null;
    onClose: () => void;
    onSelectTask: (id: string) => void;
    onCloseTask: () => void;
    handleRefresh: () => void;
    onUseHistory: (task: TaskHistoryItem) => void;
    onViewAnalysis: (task: TaskHistoryItem) => void;
    onDeleteTask: (task: TaskHistoryItem) => void;
};

const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return timestamp;
    return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(date);
};

const hasUploadedResume = (task: TaskHistoryItem) =>
    Boolean(task.unfixedResume) && task.unfixedResume !== "N/A";

function StatusBadges({ task }: { task: TaskHistoryItem }) {
    return (
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {task.fixedResume ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[0.65rem] font-semibold text-emerald-700">
                    <Check className="h-3 w-3" /> Fixed
                </span>
            ) : task.hasAnalysis ? (
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[0.65rem] font-semibold text-blue-700">
                    Analysis saved
                </span>
            ) : (
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[0.65rem] font-medium text-gray-500">
                    Legacy entry
                </span>
            )}
        </div>
    );
}

// ─── Primary action button (Continue Analysis / Open Fixed Resume) ──────────
function PrimaryActionButton({
    task,
    pending,
    onUseHistory,
}: {
    task: TaskHistoryItem;
    pending: boolean;
    onUseHistory: (task: TaskHistoryItem) => void;
}) {
    const canUse = Boolean(task.fixedResume || task.hasAnalysis);
    if (!canUse) return null;

    const label = task.fixedResume ? "Open Fixed Resume" : "Continue Analysis";
    const Icon = task.fixedResume ? ExternalLink : RotateCcw;

    return (
        <button
            type="button"
            disabled={pending}
            onClick={(event) => {
                event.stopPropagation();
                onUseHistory(task);
            }}
            className="inline-flex items-center justify-center gap-1.5 rounded-sm bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
        >
            {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Icon className="h-3.5 w-3.5" />}
            {label}
        </button>
    );
}

// ─── Delete button with inline confirm step ─────────────────────────────────
function DeleteControl({
    task,
    pending,
    onDeleteTask,
}: {
    task: TaskHistoryItem;
    pending: boolean;
    onDeleteTask: (task: TaskHistoryItem) => void;
}) {
    const [confirming, setConfirming] = useState(false);

    useEffect(() => {
        if (!confirming) return;
        const timeout = setTimeout(() => setConfirming(false), 4000);
        return () => clearTimeout(timeout);
    }, [confirming]);

    if (confirming) {
        return (
            <div className="inline-flex items-center gap-1.5 rounded-sm border border-red-200 bg-red-50 px-1 py-1">
                <span className="pl-1.5 text-[0.68rem] font-medium text-red-700">Delete?</span>
                <button
                    type="button"
                    disabled={pending}
                    onClick={(event) => {
                        event.stopPropagation();
                        onDeleteTask(task);
                    }}
                    className="rounded-sm bg-red-600 px-2 py-1 text-[0.68rem] font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                >
                    {pending ? <Loader2 className="h-3 w-3 animate-spin" /> : "Yes"}
                </button>
                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        setConfirming(false);
                    }}
                    className="rounded-sm px-2 py-1 text-[0.68rem] font-medium text-gray-500 hover:text-gray-800"
                >
                    Cancel
                </button>
            </div>
        );
    }

    return (
        <button
            type="button"
            onClick={(event) => {
                event.stopPropagation();
                setConfirming(true);
            }}
            className="inline-flex items-center gap-1.5 rounded-sm border border-gray-200 px-3 py-2 text-xs font-medium text-gray-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:text-sm"
            aria-label="Delete history item"
        >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
        </button>
    );
}

function TaskCard({
    task,
    expanded,
    pending,
    actionError,
    onSelect,
    onCollapse,
    onUseHistory,
    onViewAnalysis,
    onDeleteTask,
}: {
    task: TaskHistoryItem;
    expanded: boolean;
    pending: boolean;
    actionError: string | null;
    onSelect: () => void;
    onCollapse: () => void;
    onUseHistory: (task: TaskHistoryItem) => void;
    onViewAnalysis: (task: TaskHistoryItem) => void;
    onDeleteTask: (task: TaskHistoryItem) => void;
}) {
    // "View Analysis" only adds value as a separate action once a fixed resume
    // already exists (otherwise it's identical to the primary action).
    const showViewAnalysis = task.hasAnalysis && Boolean(task.fixedResume);

    return (
        <div
            className={`relative overflow-hidden rounded-sm border bg-white shadow-sm transition-all duration-300 ${expanded
                ? "border-emerald-200 ring-1 ring-emerald-100"
                : "border-gray-200 hover:border-emerald-200"
                }`}
        >
            <button
                type="button"
                onClick={onSelect}
                className="w-full px-4 py-4 text-left"
                aria-expanded={expanded}
            >
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h4 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2">{task.title}</h4>
                        <p className="mt-1 text-xs sm:text-sm text-gray-500">{formatTimestamp(task.timestamp)}</p>
                        {!expanded && <StatusBadges task={task} />}
                    </div>
                    {!expanded && (
                        <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                            {task.newScore ?? task.prevScore}
                        </span>
                    )}
                </div>
            </button>

            <div
                className={`overflow-hidden border-t border-gray-100 transition-all duration-300 ${expanded
                    ? "max-h-[32rem] opacity-100"
                    : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-4">
                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation();
                            onCollapse();
                        }}
                        className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
                        aria-label="Close task details"
                    >
                        <X className="h-4 w-4" />
                    </button>

                    <div className="flex flex-col gap-3 text-sm text-gray-700">
                        <p className="ml-3 text-sm text-gray-600">Score</p>
                        <div className="relative w-full rounded-sm bg-gray-50 p-3">
                            <p className="flex items-center gap-2 mt-1 font-medium text-gray-900">
                                {task.prevScore}
                                {task.newScore != null ? (<div className="flex items-center gap-2"><ArrowRight size={16} />{task.newScore}</div>) : ""}
                            </p>
                        </div>

                        {/* Primary actions */}
                        <p className="ml-3 text-sm text-gray-600">Actions</p>
                        <div className="flex flex-wrap items-center gap-2 rounded-sm bg-gray-50 p-3">
                            <PrimaryActionButton task={task} pending={pending} onUseHistory={onUseHistory} />

                            {showViewAnalysis && (
                                <button
                                    type="button"
                                    disabled={pending}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onViewAnalysis(task);
                                    }}
                                    className="inline-flex items-center justify-center gap-1.5 rounded-sm border-2 border-emerald-700 px-3 py-2 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
                                >
                                    {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Eye className="h-3.5 w-3.5" />}
                                    View Analysis
                                </button>
                            )}

                            {!task.fixedResume && !task.hasAnalysis && (
                                <span className="text-xs text-gray-400">
                                    No saved analysis for this older item — you can still open the uploaded PDF below.
                                </span>
                            )}

                            <div className="ml-auto">
                                <DeleteControl task={task} pending={pending} onDeleteTask={onDeleteTask} />
                            </div>
                        </div>

                        {actionError && (
                            <p className="ml-3 text-xs text-red-600">{actionError}</p>
                        )}

                        {/* Raw file link */}
                        {hasUploadedResume(task) && (
                            <>
                                <p className="ml-3 text-sm text-gray-600">Original file</p>
                                <div className="flex items-center gap-3 rounded-sm bg-gray-50 p-3">
                                    <Link
                                        href={task.unfixedResume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline px-5 py-2.5 text-emerald-700 border-2 border-emerald-700 text-xs md:text-sm rounded-sm truncate"
                                        onClick={(event) => event.stopPropagation()}
                                    >
                                        Uploaded Resume
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function HistoryDrawer({
    open,
    tasks,
    loading,
    error,
    handleRefresh,
    activeTaskId,
    pendingTaskId,
    actionError,
    onClose,
    onSelectTask,
    onCloseTask,
    onUseHistory,
    onViewAnalysis,
    onDeleteTask,
}: HistoryDrawerProps) {
    const renderList = () => {
        if (loading) {
            return <div className="rounded-2xl border border-dashed border-gray-200 bg-white/80 p-4 text-sm text-gray-500">Loading history...</div>;
        }
        if (error) {
            return <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>;
        }
        if (tasks.length === 0) {
            return <div className="rounded-2xl border border-dashed border-gray-200 bg-white/80 p-4 text-sm text-gray-500">No task history yet.</div>;
        }
        return tasks.map((task) => (
            <TaskCard
                key={task.id}
                task={task}
                expanded={activeTaskId === task.id}
                pending={pendingTaskId === task.id}
                actionError={activeTaskId === task.id ? actionError : null}
                onSelect={() => onSelectTask(task.id)}
                onCollapse={onCloseTask}
                onUseHistory={onUseHistory}
                onViewAnalysis={onViewAnalysis}
                onDeleteTask={onDeleteTask}
            />
        ));
    };

    return (
        <>
            <div
                className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-300 md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
                onClick={onClose}
            />

            <div
                className={`absolute left-0 right-0 top-17 z-30 hidden overflow-hidden border-b border-emerald-100 bg-white shadow-2xl transition-all duration-300 md:block ${open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"}`}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
                    <div>
                        <div className="flex flex-row-reverse items-center justify-between gap-4 border-b border-emerald-100 px-5 py-4">
                            <div className="flex items-center gap-3 ">
                                <button
                                    className="px-2 py-1 text-xs text-emerald-700 hover:text-emerald-800 border-emerald-700 border rounded-sm "
                                    onClick={handleRefresh}
                                >
                                    Refresh
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex h-8 w-8 items-center justify-center "
                                    aria-label="Close history drawer"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="pr-10">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">History</p>
                                <h3 className="mt-1 text-lg font-bold text-gray-900">Recent task snapshots</h3>
                                <p className="mt-1 text-sm text-gray-600">Open a task to continue it, view its analysis, or delete it.</p>
                            </div>
                        </div>

                        <div className="mt-4 grid gap-3 lg:grid-cols-2 xl:grid-cols-3 max-h-[60vh] overflow-y-auto pr-1">
                            {renderList()}
                        </div>
                    </div>
                </div>
            </div>

            <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm transform bg-white shadow-2xl transition-transform duration-300 md:hidden ${open ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex h-full flex-col">
                    <div className="flex items-start justify-between border-b border-emerald-100 px-5 py-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">History</p>
                            <h3 className="mt-1 text-lg font-bold text-gray-900">Recent tasks</h3>
                        </div>
                        <div className="flex items-center gap-3 ">
                            <button
                                className="px-2 py-1 text-xs text-emerald-700 hover:text-emerald-800 border-emerald-700 border rounded-sm "
                                onClick={handleRefresh}
                            >
                                Refresh
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex h-8 w-8 items-center justify-center "
                                aria-label="Close history drawer"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-5 py-4">
                        <div className="grid gap-3">
                            {renderList()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
