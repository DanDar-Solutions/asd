import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-gray-100 p-6">
                <h2 className="font-bold text-xl mb-4">Dashboard</h2>
                <nav className="flex flex-col gap-2">
                    <a href="/dashboard" className="hover:underline">All Items</a>
                </nav>
            </aside>
            <main className="flex-1 p-6 bg-white">
                {children}
            </main>
        </div>
    );
}