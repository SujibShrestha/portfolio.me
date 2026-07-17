import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-6 py-32 relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,234,123,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,234,123,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />
      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full"
        style={{
          background: "radial-gradient(circle at center, rgba(0,234,123,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 text-center max-w-md space-y-6">
        <p className="font-mono text-xs text-[#00ea7b] tracking-[0.3em] uppercase">
          Error 404
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Page Not Found
        </h1>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded bg-[#00ea7b] px-6 py-3 font-mono text-xs font-bold text-black uppercase tracking-wider transition-all duration-200 hover:bg-[#22c55e] hover:shadow-[0_0_24px_rgba(0,234,123,0.4)]"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
