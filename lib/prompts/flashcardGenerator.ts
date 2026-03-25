import type { FlashcardGeneratorRequest } from "@/lib/validators/flashcardGenerator";

export function buildFlashcardGeneratorPrompt(input: FlashcardGeneratorRequest): {
  system: string;
  user: string;
} {
  const system = `
You are an expert exam coach.
You generate exam-focused flashcards from the provided topic.

OUTPUT RULE (very strict):
- Return ONLY a single valid JSON object.
- No markdown, no code fences.
- No preface, no explanation, no trailing text.
- The response MUST start with "{", and MUST end with "}".

JSON SCHEMA (match exactly; no extra keys):
{
  "flashcards": [
    { "front": "...", "back": "..." }
  ],
  "topic_summary": "..."
}

CONSTRAINTS:
- flashcards array length must be exactly ${input.numberOfCards}.
- front: a concise question/prompt (<= 90 chars).
- back: a crisp answer/explanation (<= 260 chars).
- topic_summary: 3-5 sentences summarizing what the cards cover (<= 800 chars).
`.trim();

  const user = `
Exam type: ${input.examType}
Number of cards: ${input.numberOfCards}
Topic:
${input.topic}
`.trim();

  return { system, user };
}

