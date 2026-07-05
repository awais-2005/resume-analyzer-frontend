"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AuthUser = {
    userId: string;
    email: string;
    name: string;
    picture?: string;
    googleId?: string;
    exp: number;
};

function decodeTokenPayload(token: string): AuthUser | null {
    try {
        const parts = token.split(".");
        if (parts.length < 2) return null;

        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
        const payload = JSON.parse(atob(padded));

        if (payload.exp < Math.floor(Date.now() / 1000)) {
            return null
        }

        return {
            userId: payload.userId ?? "",
            email: payload.email ?? "",
            name: payload.name ?? "",
            picture: payload.picture ?? undefined,
            googleId: payload.googleId ?? undefined,
            exp: payload.exp ?? 0,
        };
    } catch {
        return null;
    }
}

export function useAuth() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<AuthUser | null>(() => {
        if (typeof window === "undefined") return null;
        const token = localStorage.getItem("token");
        return token ? decodeTokenPayload(token) : null;
    });

    const logout = useCallback(() => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
        }
        setIsLoggedIn(false);
        setUser(null);
        router.push("/auth/login");
    }, [router]);

    useEffect(() => {
        queueMicrotask(() => {
            if (!user) {
                logout();
                return;
            }
            setIsLoggedIn(true);
        });
    }, [user, logout]);

    const refreshAuth = useCallback(() => {
        if (typeof window === "undefined") return;

        const token = localStorage.getItem("token");
        if (!token) {
            setIsLoggedIn(false);
            setUser(null);
            return;
        }

        setIsLoggedIn(true);
        setUser(decodeTokenPayload(token));
    }, []);

    useEffect(() => {
        const handleStorageChange = () => refreshAuth();
        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("focus", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("focus", handleStorageChange);
        };
    }, [refreshAuth]);


    return { isLoggedIn, user, logout };
}
