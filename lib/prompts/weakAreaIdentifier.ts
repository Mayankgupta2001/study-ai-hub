import type { WeakAreaIdentifierRequest } from "@/lib/validators/weakAreaIdentifier";

export function buildWeakAreaIdentifierPrompt(input: WeakAreaIdentifierRequest): {
  system: string;
  user: string;
} {
  const system = `
You are an academic counselor for exam preparation.
Analyze the student's topic ratings and propose targeted study actions.

OUTPUT RULE (very strict):
- Return ONLY a single valid JSON object.
- No markdown, no code fences.
- No preface, no explanation, no trailing text.
- The response MUST start with "{", and MUST end with "}".

JSON SCHEMA (match exactly; no extra keys):
{
  "weak_areas": ["...","..."],
  "strong_areas": ["...","..."],
  "study_plan": ["...","...","..."],
  "priority_topic": "..."
}

RATING LOGIC:
- Ratings are 1-5.
- weak_areas should emphasize topics with rating 1-2.
- strong_areas should emphasize topics with rating 4-5.
- priority_topic should be the single weakest topic (lowest rating; if tie, pick the first).

CONSTRAINTS:
- weak_areas: 2-5 items (topic names).
- strong_areas: 2-4 items (topic names).
- study_plan: 6-10 actionable steps (keep each step <= 200 chars).
- priority_topic: a topic name from the provided list.
`.trim();

  const user = `
Exam type: ${input.examType}

Student topic attempts (topic, rating 1-5):
${input.topics
  .map((t) => `- ${t.topic}: ${t.rating}/5`)
  .join("\n")}
`.trim();

  return { system, user };
}

