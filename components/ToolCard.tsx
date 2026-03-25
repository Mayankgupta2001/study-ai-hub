import Link from "next/link";
import type { Tool } from "@/lib/data";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={tool.href}
      className="group flex flex-col bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1 active:translate-y-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      aria-label={`${tool.title} — ${tool.badge} tool for ${tool.exam}`}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center text-2xl mb-5 shrink-0 group-hover:bg-indigo-200 transition-colors duration-200"
        aria-hidden="true"
      >
        {tool.icon}
      </div>

      {/* Title */}
      <h3 className="font-dm-sans text-lg font-semibold text-slate-900 mb-3 leading-snug group-hover:text-indigo-600 transition-colors duration-200">
        {tool.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-600 leading-relaxed mb-5 flex-1">
        {tool.description}
      </p>

      {/* Footer row */}
      <div className="flex items-center justify-between gap-2 mt-auto">
        <span className="text-xs text-slate-500 font-medium tracking-wide">
          {tool.exam}
        </span>

        <span
          className={`text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-md ${
            tool.badge === "Free"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-indigo-100 text-indigo-700"
          }`}
        >
          {tool.badge}
        </span>
      </div>
    </Link>
  );
}
