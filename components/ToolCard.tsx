import Link from "next/link";
import type { Tool } from "@/lib/data";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={tool.href}
      className="group bg-white border border-rule rounded-lg p-6 flex flex-col hover:shadow-md transition-shadow duration-200"
      aria-label={`${tool.title} — ${tool.badge} tool`}
    >
      <div
        className="w-9 h-9 rounded-md bg-accent-light flex items-center justify-center text-lg mb-4 flex-shrink-0"
        aria-hidden="true"
      >
        {tool.icon}
      </div>

      <h3 className="font-serif text-lg font-semibold text-ink mb-2 leading-snug">
        {tool.title}
      </h3>

      <p className="text-sm text-ink-soft leading-relaxed mb-4 flex-1">
        {tool.description}
      </p>

      <span
        className={`self-start text-xs font-medium tracking-wide uppercase px-2 py-0.5 rounded ${
          tool.badge === "Free"
            ? "bg-green-100 text-green-800"
            : "bg-purple-100 text-purple-800"
        }`}
      >
        {tool.badge}
      </span>
    </Link>
  );
}
