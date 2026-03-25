export type WeakAreaExamType = "UPSC" | "JEE" | "NEET" | "SSC";

export interface WeakAreaTopicAttempt {
  topic: string;
  rating: number; // 1-5
}

export interface WeakAreaIdentifierRequest {
  examType: WeakAreaExamType;
  topics: WeakAreaTopicAttempt[];
}

export interface WeakAreaIdentifierEvaluation {
  weak_areas: string[];
  strong_areas: string[];
  study_plan: string[];
  priority_topic: string;
}

const MIN_TOPIC_CHARS = 2;
const MAX_TOPIC_CHARS = 140;
const MAX_STUDY_STEPS = 12;
const MAX_LIST_ITEMS = 6;
const MAX_TEXT_CHARS = 350;

function cleanString(value: unknown, maxChars: number): string {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxChars);
}

function normalizeExamType(examTypeRaw: unknown): WeakAreaExamType | null {
  if (typeof examTypeRaw !== "string") return null;
  const normalized = examTypeRaw.trim().toUpperCase();
  if (normalized === "UPSC") return "UPSC";
  if (normalized === "JEE") return "JEE";
  if (normalized === "NEET") return "NEET";
  if (normalized === "SSC") return "SSC";
  return null;
}

export function validateWeakAreaIdentifierRequest(
  payload: unknown,
): { ok: true; data: WeakAreaIdentifierRequest } | { ok: false; error: string } {
  if (!payload || typeof payload !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const obj = payload as Record<string, unknown>;
  const examType = normalizeExamType(obj.examType);
  const topicsRaw = obj.topics;

  if (!examType) {
    return { ok: false, error: "Invalid exam type. Use UPSC, JEE, NEET, or SSC." };
  }

  if (!Array.isArray(topicsRaw) || topicsRaw.length === 0) {
    return { ok: false, error: "Please provide at least one topic with a rating." };
  }

  const topics: WeakAreaTopicAttempt[] = topicsRaw
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const i = item as Record<string, unknown>;
      const topic = cleanString(i.topic, MAX_TOPIC_CHARS);
      const ratingRaw = i.rating;
      const rating =
        typeof ratingRaw === "number" && Number.isFinite(ratingRaw)
          ? Math.round(ratingRaw)
          : typeof ratingRaw === "string" && ratingRaw.trim()
            ? Math.round(Number(ratingRaw))
            : NaN;

      if (!topic || topic.length < MIN_TOPIC_CHARS) return null;
      if (!Number.isFinite(rating)) return null;
      if (rating < 1 || rating > 5) return null;

      return { topic, rating };
    })
    .filter(Boolean) as WeakAreaTopicAttempt[];

  if (topics.length === 0) {
    return { ok: false, error: "No valid topic/rating pairs were provided." };
  }

  if (topics.length > 12) {
    return { ok: false, error: "Too many topics. Please keep it under 12." };
  }

  return { ok: true, data: { examType, topics } };
}

export function parseWeakAreaIdentifierJson(
  rawText: string,
): { ok: true; data: WeakAreaIdentifierEvaluation } | { ok: false; error: string } {
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
    return { ok: false, error: "Invalid evaluation shape." };
  }

  const obj = parsed as Record<string, unknown>;
  const weak_areas = Array.isArray(obj.weak_areas)
    ? obj.weak_areas
        .map((x) => cleanString(x, MAX_TEXT_CHARS))
        .filter(Boolean)
        .slice(0, MAX_LIST_ITEMS)
    : [];
  const strong_areas = Array.isArray(obj.strong_areas)
    ? obj.strong_areas
        .map((x) => cleanString(x, MAX_TEXT_CHARS))
        .filter(Boolean)
        .slice(0, MAX_LIST_ITEMS)
    : [];
  const study_plan = Array.isArray(obj.study_plan)
    ? obj.study_plan
        .map((x) => cleanString(x, MAX_TEXT_CHARS))
        .filter(Boolean)
        .slice(0, MAX_STUDY_STEPS)
    : [];

  const priority_topic = cleanString(obj.priority_topic, MAX_TEXT_CHARS);

  if (!priority_topic) return { ok: false, error: "Missing priority_topic." };
  if (!weak_areas.length) return { ok: false, error: "Missing weak_areas." };
  if (!strong_areas.length) return { ok: false, error: "Missing strong_areas." };
  if (!study_plan.length) return { ok: false, error: "Missing study_plan." };

  return {
    ok: true,
    data: {
      weak_areas,
      strong_areas,
      study_plan,
      priority_topic,
    },
  };
}

