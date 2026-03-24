export interface AnswerCoachRequest {
  question?: string;
  answer: string;
  wordLimit?: number;
}

export interface AnswerCoachEvaluation {
  score: number;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  examinerSummary: string;
}

const MIN_ANSWER_CHARS = 80;
const MAX_ANSWER_CHARS = 8000;
const MAX_QUESTION_CHARS = 500;
const MAX_LIST_ITEMS = 6;
const MAX_ITEM_CHARS = 220;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function cleanString(value: unknown, maxChars: number): string {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxChars);
}

function cleanStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => cleanString(item, MAX_ITEM_CHARS))
    .filter(Boolean)
    .slice(0, MAX_LIST_ITEMS);
}

export function validateAnswerCoachRequest(
  payload: unknown,
): { ok: true; data: AnswerCoachRequest } | { ok: false; error: string } {
  if (!payload || typeof payload !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const obj = payload as Record<string, unknown>;
  const question = cleanString(obj.question, MAX_QUESTION_CHARS);
  const answer = typeof obj.answer === "string" ? obj.answer.trim() : "";
  const wordLimitRaw = obj.wordLimit;
  const wordLimit =
    typeof wordLimitRaw === "number" && Number.isFinite(wordLimitRaw)
      ? clamp(Math.round(wordLimitRaw), 50, 500)
      : undefined;

  if (!answer) {
    return { ok: false, error: "Answer is required." };
  }

  if (answer.length < MIN_ANSWER_CHARS) {
    return {
      ok: false,
      error: `Answer is too short. Please write at least ${MIN_ANSWER_CHARS} characters.`,
    };
  }

  if (answer.length > MAX_ANSWER_CHARS) {
    return {
      ok: false,
      error: `Answer is too long. Keep it under ${MAX_ANSWER_CHARS} characters.`,
    };
  }

  return {
    ok: true,
    data: {
      question: question || undefined,
      answer,
      wordLimit,
    },
  };
}

export function parseEvaluationJson(
  rawText: string,
): { ok: true; data: AnswerCoachEvaluation } | { ok: false; error: string } {
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
  const scoreRaw = Number(obj.score);
  const score = Number.isFinite(scoreRaw) ? clamp(scoreRaw, 0, 10) : NaN;
  const strengths = cleanStringArray(obj.strengths);
  const weaknesses = cleanStringArray(obj.weaknesses);
  const improvements = cleanStringArray(obj.improvements);
  const examinerSummary = cleanString(obj.examinerSummary, 500);

  if (Number.isNaN(score)) {
    return { ok: false, error: "Invalid score in model response." };
  }

  if (!examinerSummary) {
    return { ok: false, error: "Missing examiner summary in response." };
  }

  if (!strengths.length || !weaknesses.length || !improvements.length) {
    return { ok: false, error: "Incomplete evaluation data in response." };
  }

  return {
    ok: true,
    data: {
      score: Math.round(score * 10) / 10,
      strengths,
      weaknesses,
      improvements,
      examinerSummary,
    },
  };
}
