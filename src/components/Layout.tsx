import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950">

      <main className="max-w-7xl mx-auto px-6 py-12">
        {title && (
          <div className="text-center mb-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              {title}
            </h1>
          </div>
        )}

        {children}
      </main>
    </div>
  );
}