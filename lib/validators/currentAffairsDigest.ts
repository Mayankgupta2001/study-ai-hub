export type ExamType = "UPSC" | "SSC" | "General";
export type Timeframe = "This Week" | "This Month" | "Recent";

export interface CurrentAffairsDigestRequest {
  topic: string;
  examType: ExamType;
  timeframe: Timeframe;
}

export interface CurrentAffairsDigestResult {
  summary: string;
  key_points: string[];
  importance_for_exam: string;
  related_topics: string[];
  quick_revision: string;
}

const MIN_TOPIC_CHARS = 8;
const MAX_TOPIC_CHARS = 1200;

function cleanString(value: unknown, maxChars: number): string {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxChars);
}

function cleanStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => cleanString(item, 220))
    .filter(Boolean);
}

function normalizeExamType(val: unknown): ExamType | null {
  if (typeof val !== "string") return null;
  const v = val.trim();
  if (v === "UPSC" || v === "SSC" || v === "General") return v;
  return null;
}

function normalizeTimeframe(val: unknown): Timeframe | null {
  if (typeof val !== "string") return null;
  const v = val.trim();
  if (v === "This Week" || v === "This Month" || v === "Recent") return v;
  return null;
}

export function validateCurrentAffairsDigestRequest(
  payload: unknown,
): { ok: true; data: CurrentAffairsDigestRequest } | { ok: false; error: string } {
  if (!payload || typeof payload !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const obj = payload as Record<string, unknown>;
  const topic = cleanString(obj.topic, MAX_TOPIC_CHARS);
  const examType = normalizeExamType(obj.examType);
  const timeframe = normalizeTimeframe(obj.timeframe);

  if (!topic) {
    return { ok: false, error: "Topic is required." };
  }

  if (topic.length < MIN_TOPIC_CHARS) {
    return { ok: false, error: `Topic is too short. Provide at least ${MIN_TOPIC_CHARS} characters.` };
  }

  if (!examType) {
    return { ok: false, error: "examType must be UPSC, SSC, or General." };
  }

  if (!timeframe) {
    return { ok: false, error: "timeframe must be This Week, This Month, or Recent." };
  }

  return { ok: true, data: { topic, examType, timeframe } };
}

export function parseCurrentAffairsDigestJson(
  rawText: string,
): { ok: true; data: CurrentAffairsDigestResult } | { ok: false; error: string } {
  const text = rawText.trim();
  if (!text) return { ok: false, error: "Empty model response." };

  const fencedMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const candidate = fencedMatch?.[1] ?? text;

  let parsed: unknown;
  try {
    parsed = JSON.parse(candidate);
  } catch {
    return { ok: false, error: "Model did not return valid JSON." };
  }

  if (!parsed || typeof parsed !== "object") {
    return { ok: false, error: "Invalid JSON shape." };
  }

  const obj = parsed as Record<string, unknown>;

  const summary = cleanString(obj.summary, 1200);
  const key_points = cleanStringArray(obj.key_points).slice(0, 8);
  const importance_for_exam = cleanString(obj.importance_for_exam, 700);
  const related_topics = cleanStringArray(obj.related_topics).slice(0, 8);
  const quick_revision = cleanString(obj.quick_revision, 700);

  if (!summary) return { ok: false, error: "Missing summary." };
  if (key_points.length < 3) return { ok: false, error: "Need at least 3 key points." };
  if (!importance_for_exam) return { ok: false, error: "Missing importance_for_exam." };
  if (related_topics.length < 2) return { ok: false, error: "Need at least 2 related topics." };
  if (!quick_revision) return { ok: false, error: "Missing quick_revision." };

  return {
    ok: true,
    data: {
      summary,
      key_points,
      importance_for_exam,
      related_topics,
      quick_revision,
    },
  };
}
