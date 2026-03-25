export type ExamType = "UPSC" | "NEET" | "SSC";

export interface FlashcardGeneratorRequest {
  topic: string;
  examType: ExamType;
  numberOfCards: number;
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface FlashcardGeneratorEvaluation {
  flashcards: Flashcard[];
  topic_summary: string;
}

const MIN_TOPIC_CHARS = 10;
const MAX_TOPIC_CHARS = 5000;
const MAX_SUMMARY_CHARS = 800;
const MAX_CARD_TEXT_CHARS = 300;

function cleanString(value: unknown, maxChars: number): string {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxChars);
}

function normalizeExamType(examTypeRaw: unknown): ExamType | null {
  if (typeof examTypeRaw !== "string") return null;
  const normalized = examTypeRaw.trim().toUpperCase();
  if (normalized === "UPSC") return "UPSC";
  if (normalized === "NEET") return "NEET";
  if (normalized === "SSC") return "SSC";
  return null;
}

export function validateFlashcardGeneratorRequest(
  payload: unknown,
): { ok: true; data: FlashcardGeneratorRequest } | { ok: false; error: string } {
  if (!payload || typeof payload !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const obj = payload as Record<string, unknown>;
  const topic = cleanString(obj.topic, MAX_TOPIC_CHARS);
  const examType = normalizeExamType(obj.examType);
  const nRaw = obj.numberOfCards;
  const numberOfCards =
    typeof nRaw === "number" && Number.isFinite(nRaw)
      ? Math.round(nRaw)
      : typeof nRaw === "string" && nRaw.trim()
        ? Math.round(Number(nRaw))
        : NaN;

  if (!topic) return { ok: false, error: "Topic is required." };
  if (topic.length < MIN_TOPIC_CHARS) {
    return {
      ok: false,
      error: `Topic is too short. Please provide at least ${MIN_TOPIC_CHARS} characters.`,
    };
  }

  if (!examType) {
    return { ok: false, error: "Invalid exam type. Use NEET, SSC, or UPSC." };
  }

  if (!Number.isFinite(numberOfCards)) {
    return { ok: false, error: "numberOfCards must be a number between 1 and 10." };
  }

  if (numberOfCards < 1 || numberOfCards > 10) {
    return { ok: false, error: "numberOfCards must be between 1 and 10." };
  }

  return {
    ok: true,
    data: { topic, examType, numberOfCards },
  };
}

export function parseFlashcardGeneratorJson(
  rawText: string,
): { ok: true; data: FlashcardGeneratorEvaluation } | { ok: false; error: string } {
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
  const topic_summary = cleanString(obj.topic_summary, MAX_SUMMARY_CHARS);

  const flashcardsRaw = Array.isArray(obj.flashcards) ? obj.flashcards : [];
  const flashcards: Flashcard[] = flashcardsRaw
    .map((card) => {
      if (!card || typeof card !== "object") return null;
      const c = card as Record<string, unknown>;
      const front = cleanString(c.front, MAX_CARD_TEXT_CHARS);
      const back = cleanString(c.back, 1200);
      if (!front || !back) return null;
      return { front, back };
    })
    .filter(Boolean) as Flashcard[];

  if (!topic_summary) return { ok: false, error: "Missing topic_summary." };
  if (flashcards.length < 1) return { ok: false, error: "Missing flashcards." };

  // Keep it reasonably sized even if the model is verbose.
  const safeFlashcards = flashcards.slice(0, 10);

  const safeTopic_summary = topic_summary;

  // Ensure JSON shape is stable for the UI.
  const stableTopic_summary = cleanString(safeTopic_summary, MAX_SUMMARY_CHARS);

  return {
    ok: true,
    data: {
      flashcards: safeFlashcards,
      topic_summary: stableTopic_summary,
    },
  };
}

