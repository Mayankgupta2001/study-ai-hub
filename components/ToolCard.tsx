import Link from "next/link";
import type { Tool } from "@/lib/data";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={tool.href}
      className="group flex flex-col bg-white border border-rule rounded-xl p-6 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={`${tool.title} — ${tool.badge} tool for ${tool.exam}`}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center text-xl mb-5 shrink-0"
        aria-hidden="true"
      >
        {tool.icon}
      </div>

      {/* Title */}
      <h3 className="font-serif text-lg font-semibold text-ink mb-2 leading-snug">
        {tool.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-ink-soft leading-relaxed mb-5 flex-1">
        {tool.description}
      </p>

      {/* Footer row */}
      <div className="flex items-center justify-between gap-2 mt-auto">
        <span className="text-[11px] text-ink-muted font-medium tracking-wide">
          {tool.exam}
        </span>

        <span
          className={`text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded ${
            tool.badge === "Free"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-violet-50 text-violet-700"
          }`}
        >
          {tool.badge}
        </span>
      </div>
    </Link>
  );
}
