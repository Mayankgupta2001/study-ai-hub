export type JeeSubject = "Physics" | "Chemistry" | "Math";

export interface JeeProblemBreakdownRequest {
  subject: JeeSubject;
  problem: string;
}

export type JeeDifficulty = "Easy" | "Medium" | "Hard";

export interface JeeProblemBreakdownEvaluation {
  step_by_step: string[];
  concept_used: string[];
  common_mistakes: string[];
  difficulty: JeeDifficulty;
  tip: string;
}

const MIN_PROBLEM_CHARS = 30;
const MAX_PROBLEM_CHARS = 6000;
const MAX_TEXT_CHARS = 500;
const MAX_STEPS = 10;
const MAX_CONCEPTS = 8;
const MAX_MISTAKES = 8;

function cleanString(value: unknown, maxChars: number): string {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxChars);
}

function cleanStringArray(value: unknown, maxItems: number, maxChars: number) {
  if (!Array.isArray(value)) return [] as string[];
  return value
    .map((item) => cleanString(item, maxChars))
    .filter(Boolean)
    .slice(0, maxItems);
}

function normalizeSubject(subjectRaw: unknown): JeeSubject | null {
  if (typeof subjectRaw !== "string") return null;
  const normalized = subjectRaw.trim().toLowerCase();
  if (normalized === "physics" || normalized === "phy") return "Physics";
  if (normalized === "chemistry" || normalized === "chem") return "Chemistry";
  if (
    normalized === "math" ||
    normalized === "mathematics" ||
    normalized === "m"
  )
    return "Math";
  return null;
}

export function validateJeeProblemBreakdownRequest(
  payload: unknown,
): { ok: true; data: JeeProblemBreakdownRequest } | { ok: false; error: string } {
  if (!payload || typeof payload !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const obj = payload as Record<string, unknown>;
  const subject = normalizeSubject(obj.subject);
  const problem = cleanString(obj.problem, MAX_PROBLEM_CHARS);

  if (!subject) {
    return { ok: false, error: "Invalid subject. Use Physics, Chemistry, or Math." };
  }

  if (!problem) {
    return { ok: false, error: "Problem is required." };
  }

  if (problem.length < MIN_PROBLEM_CHARS) {
    return {
      ok: false,
      error: `Problem is too short. Please paste at least ${MIN_PROBLEM_CHARS} characters.`,
    };
  }

  return {
    ok: true,
    data: { subject, problem },
  };
}

export function parseJeeProblemBreakdownJson(
  rawText: string,
): { ok: true; data: JeeProblemBreakdownEvaluation } | { ok: false; error: string } {
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
  const step_by_step = cleanStringArray(obj.step_by_step, MAX_STEPS, MAX_TEXT_CHARS);
  const concept_used = cleanStringArray(obj.concept_used, MAX_CONCEPTS, MAX_TEXT_CHARS);
  const common_mistakes = cleanStringArray(
    obj.common_mistakes,
    MAX_MISTAKES,
    MAX_TEXT_CHARS,
  );

  const difficultyRaw = cleanString(obj.difficulty, 20) as JeeDifficulty;
  const difficulty: JeeDifficulty | null =
    difficultyRaw === "Easy" || difficultyRaw === "Medium" || difficultyRaw === "Hard"
      ? difficultyRaw
      : null;

  const tip = cleanString(obj.tip, 700);

  if (!difficulty) return { ok: false, error: "Missing/invalid difficulty." };
  if (step_by_step.length < 3)
    return { ok: false, error: "Missing/insufficient step_by_step items." };
  if (!concept_used.length) return { ok: false, error: "Missing concept_used items." };
  if (!common_mistakes.length)
    return { ok: false, error: "Missing common_mistakes items." };
  if (!tip) return { ok: false, error: "Missing tip in response." };

  // Extra safety: keep difficulty aligned with expected values.
  const safeDifficulty = (difficulty as JeeDifficulty) ?? "Medium";

  return {
    ok: true,
    data: {
      step_by_step,
      concept_used,
      common_mistakes,
      difficulty: safeDifficulty,
      tip,
    },
  };
}

