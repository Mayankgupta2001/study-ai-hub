export type Subject = "Physics" | "Chemistry" | "Biology" | "History" | "Geography" | "Political Science" | "Economics";
export type ClassLevel = "6-8" | "9-10" | "11-12";

export interface NcertConceptExplainerRequest {
  concept: string;
  subject: Subject;
  class_level: ClassLevel;
}

export interface NcertConceptExplainerResult {
  simple_explanation: string;
  key_points: string[];
  examples: string[];
  exam_relevance: string;
  remember_this: string;
}

const MIN_CONCEPT_CHARS = 4;
const MAX_CONCEPT_CHARS = 1000;

function cleanString(value: unknown, maxChars: number): string {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxChars);
}

function cleanStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => cleanString(item, 260))
    .filter(Boolean);
}

function normalizeSubject(other: unknown): Subject | null {
  if (typeof other !== "string") return null;
  const s = other.trim();
  const valid: Subject[] = ["Physics", "Chemistry", "Biology", "History", "Geography", "Political Science", "Economics"];
  return valid.includes(s as Subject) ? (s as Subject) : null;
}

function normalizeClassLevel(other: unknown): ClassLevel | null {
  if (typeof other !== "string") return null;
  const s = other.trim();
  const valid: ClassLevel[] = ["6-8", "9-10", "11-12"];
  return valid.includes(s as ClassLevel) ? (s as ClassLevel) : null;
}

export function validateNcertConceptExplainerRequest(
  payload: unknown,
): { ok: true; data: NcertConceptExplainerRequest } | { ok: false; error: string } {
  if (!payload || typeof payload !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const obj = payload as Record<string, unknown>;
  const concept = cleanString(obj.concept, MAX_CONCEPT_CHARS);
  const subject = normalizeSubject(obj.subject);
  const class_level = normalizeClassLevel(obj.class_level);

  if (!concept) return { ok: false, error: "Concept is required." };
  if (concept.length < MIN_CONCEPT_CHARS) {
    return { ok: false, error: `Concept is too short. Provide at least ${MIN_CONCEPT_CHARS} characters.` };
  }
  if (!subject) return { ok: false, error: "Invalid subject." };
  if (!class_level) return { ok: false, error: "Invalid class_level." };

  return { ok: true, data: { concept, subject, class_level } };
}

export function parseNcertConceptExplainerJson(
  rawText: string,
): { ok: true; data: NcertConceptExplainerResult } | { ok: false; error: string } {
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

  if (!parsed || typeof parsed !== "object") return { ok: false, error: "Invalid JSON shape." };

  const obj = parsed as Record<string, unknown>;

  const simple_explanation = cleanString(obj.simple_explanation, 1200);
  const key_points = cleanStringArray(obj.key_points).slice(0, 10);
  const examples = cleanStringArray(obj.examples).slice(0, 6);
  const exam_relevance = cleanString(obj.exam_relevance, 800);
  const remember_this = cleanString(obj.remember_this, 360);

  if (!simple_explanation) return { ok: false, error: "Missing simple_explanation." };
  if (key_points.length < 3) return { ok: false, error: "Need at least 3 key points." };
  if (examples.length < 1) return { ok: false, error: "Need at least 1 example." };
  if (!exam_relevance) return { ok: false, error: "Missing exam_relevance." };
  if (!remember_this) return { ok: false, error: "Missing remember_this." };

  return {
    ok: true,
    data: {
      simple_explanation,
      key_points,
      examples,
      exam_relevance,
      remember_this,
    },
  };
}
