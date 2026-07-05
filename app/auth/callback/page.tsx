"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("token");

        if (token) {
            localStorage.setItem("token", token);
            router.replace("/");
            return;
        }

        router.replace("/auth/login");
    }, [router, searchParams]);

    return (
        <div className="min-h-screen bg-linear-to-br from-white via-emerald-50/40 to-white flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white border border-emerald-100 rounded-xl shadow-sm p-6 text-center">
                <div className="mx-auto w-10 h-10 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
                <h1 className="mt-4 text-lg font-semibold text-gray-900">Signing you in...</h1>
                <p className="mt-1 text-sm text-gray-500">Please wait while we complete authentication.</p>
            </div>
        </div>
    );
}
