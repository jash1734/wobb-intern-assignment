import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">

      <main className="max-w-7xl mx-auto px-6 py-16">
        {title && (
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] text-amber-500 uppercase mb-3">
              Creator directory
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-50">
              {title}
            </h1>
          </div>
        )}

        {children}
      </main>
    </div>
  );
}