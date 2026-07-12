"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import MinimalNavBar from "@/components/MinimalNavBar";
import googleIcon from "@/public/google.svg";
import Image from "next/image";
import LoginWithGoogle from "@/components/LoginWithGoogle";

type AuthResponse = {
    success: boolean;
    data: {
        token: string;
        user: { id: string; email: string; name: string; googleId?: string };
    };
    message?: string;
};

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? "";

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        if (!serverUrl) {
            setError("Server URL is not configured.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${serverUrl}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const result: AuthResponse = await response.json();

            if (!response.ok || !result.success || !result.data?.token) {
                throw new Error(result.message || "Login failed.");
            }

            localStorage.setItem("token", result.data.token);
            router.push("/");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Login failed.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-white via-emerald-50/40 to-white">
            <MinimalNavBar />
            <div className="px-4 py-10 sm:py-14">
                <div className="max-w-md mx-auto bg-white border border-emerald-100 rounded-xl shadow-sm p-6 sm:p-8">
                    <h1 className="text-2xl font-bold text-gray-900">Log In</h1>
                    <p className="mt-1 text-sm text-gray-500">Continue to analyze and improve your resume.</p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 w-full rounded-xl border border-emerald-100 px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 w-full rounded-xl border border-emerald-100 px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Logging in..." : "Log In"}
                        </button>
                    </form>

                    <div className="my-5 flex items-center gap-3">
                        <div className="h-px bg-gray-200 flex-1" />
                        <span className="text-xs text-gray-400">OR</span>
                        <div className="h-px bg-gray-200 flex-1" />
                    </div>

                    <LoginWithGoogle />

                    <p className="mt-6 text-sm text-gray-600 text-center">
                        New to Resumlyze?{" "}
                        <Link href="/auth/register" className="text-emerald-700 font-medium hover:text-emerald-800">
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
