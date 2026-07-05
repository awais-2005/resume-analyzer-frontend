"use client";

import { TaskHistoryItem } from "@/app/types/Api";
import { ArrowRight, ChevronDown, ExternalLink, X } from "lucide-react";
import Link from "next/link";

type HistoryDrawerProps = {
    open: boolean;
    tasks: TaskHistoryItem[];
    loading: boolean;
    error: string | null;
    activeTaskId: string | null;
    onClose: () => void;
    onSelectTask: (id: string) => void;
    onCloseTask: () => void;
    handleRefresh: () => void;
};

const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return timestamp;
    return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(date);
};

function TaskCard({
    task,
    expanded,
    onSelect,
    onCollapse,
}: {
    task: TaskHistoryItem;
    expanded: boolean;
    onSelect: () => void;
    onCollapse: () => void;
}) {
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
                    </div>
                    {!expanded && (<span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        {task.newScore ?? task.prevScore}
                    </span>)}
                </div>
            </button>

            <div
                className={`overflow-hidden border-t border-gray-100 transition-all duration-300 ${expanded
                    ? "max-h-96 opacity-100"
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
                        <p className="ml-3 text-sm text-gray-600">Resumes - Click to open</p>
                        <div className="flex centre items-center justify-around gap-3 rounded-xl bg-gray-50 p-3">
                            <Link
                                href={task.unfixedResume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline px-5 py-2.5 text-emerald-700 border-2 border-emerald-700 text-xs md:text-sm lg:text-md rounded-sm truncate"
                            >
                                Uploaded Resume
                            </Link>
                            <Link
                                href={task.fixedResume || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline px-5 py-2.5 text-emerald-700 border-2 border-emerald-700 text-xs md:text-sm lg:text-md rounded-sm truncate"
                            >
                                Polished Resume
                            </Link>
                        </div>
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
    onClose,
    onSelectTask,
    onCloseTask,
}: HistoryDrawerProps) {
    const activeTask = tasks.find((task) => task.id === activeTaskId) ?? null;

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
                                <p className="mt-1 text-sm text-gray-600">Choose a task to expand its score and resume links.</p>
                            </div>
                        </div>

                        <div className="mt-4 grid gap-3 lg:grid-cols-2 xl:grid-cols-3 max-h-[60vh] overflow-y-auto pr-1">
                            {loading ? (
                                <div className="rounded-2xl border border-dashed border-gray-200 bg-white/80 p-4 text-sm text-gray-500">Loading history...</div>
                            ) : error ? (
                                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
                            ) : tasks.length === 0 ? (
                                <div className="rounded-2xl border border-dashed border-gray-200 bg-white/80 p-4 text-sm text-gray-500">No task history yet.</div>
                            ) : (
                                tasks.map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        expanded={activeTaskId === task.id}
                                        onSelect={() => onSelectTask(task.id)}
                                        onCollapse={onCloseTask}
                                    />
                                ))
                            )}
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
                            {loading ? (
                                <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-4 text-sm text-gray-500">Loading history...</div>
                            ) : error ? (
                                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
                            ) : tasks.length === 0 ? (
                                <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-4 text-sm text-gray-500">No task history yet.</div>
                            ) : (
                                tasks.map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        expanded={activeTaskId === task.id}
                                        onSelect={() => onSelectTask(task.id)}
                                        onCollapse={onCloseTask}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
