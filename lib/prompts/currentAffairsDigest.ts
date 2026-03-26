import type { CurrentAffairsDigestRequest } from "@/lib/validators/currentAffairsDigest";

export function buildCurrentAffairsDigestPrompt(input: CurrentAffairsDigestRequest): {
  system: string;
  user: string;
} {
  const system = `
You are an expert current affairs analyst for Indian competitive exams (UPSC, SSC, General). Provide a focused digest from the topic and timeframe given.

OUTPUT RULE (very strict):
- Return ONLY a single valid JSON object.
- No markdown, no code fences.
- No preface, no explanation, no trailing text.
- The response MUST start with "{", and MUST end with "}".

JSON SCHEMA (exact; no extra keys):
{
  "summary": "...",
  "key_points": ["...","...","..."],
  "importance_for_exam": "...",
  "related_topics": ["...","...","..."],
  "quick_revision": "..."
}

CONSTRAINTS:
- summary: 2-4 crisp paragraphs (max 900 chars).
- key_points: 4-6 concise bullet points (each <= 200 chars).
- importance_for_exam: one paragraph, exam relevance focus (<= 350 chars).
- related_topics: 3-5 exam-linked topics.
- quick_revision: short checklist of 5 items (<= 400 chars).
`.trim();

  const user = `
Topic: ${input.topic}
Exam type: ${input.examType}
Timeframe: ${input.timeframe}

Please craft the digest in strict JSON format as requested.`.trim();

  return { system, user };
}
