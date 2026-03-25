import { NextResponse } from "next/server";
import { buildJeeProblemBreakdownPrompt } from "@/lib/prompts/jeeProblemBreakdown";
import {
  parseJeeProblemBreakdownJson,
  validateJeeProblemBreakdownRequest,
} from "@/lib/validators/jeeProblemBreakdown";

const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const modelName = "llama-3.3-70b-versatile";

type GroqChatCompletionResult = {
  error?: { message?: string };
  choices?: Array<{
    message?: { content?: string; reasoning?: string };
  }>;
};

function extractJsonObject(raw: string): string | null {
  // 1) Remove markdown code fences first (e.g. ```json ... ```).
  const withoutFences = raw.replace(
    /```(?:json)?\s*([\s\S]*?)\s*```/gi,
    "$1",
  );

  // 2) Trim to the first {...} object region.
  const firstBrace = withoutFences.indexOf("{");
  const lastBrace = withoutFences.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
    return null;
  }

  return withoutFences.slice(firstBrace, lastBrace + 1).trim();
}

export async function POST(request: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Missing GROQ_API_KEY on server." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const validated = validateJeeProblemBreakdownRequest(body);
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const prompt = buildJeeProblemBreakdownPrompt(validated.data);

    const completionResponse = await fetch(GROQ_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: modelName,
        temperature: 0.2,
        max_tokens: 900,
        messages: [
          { role: "system", content: prompt.system },
          { role: "user", content: prompt.user },
        ],
      }),
    });

    const result = (await completionResponse.json()) as GroqChatCompletionResult;

    if (!completionResponse.ok) {
      const apiErrorMessage =
        result?.error?.message ?? "Groq request failed.";
      return NextResponse.json(
        {
          error: "Failed to analyze JEE problem.",
          details: apiErrorMessage,
        },
        { status: 502 },
      );
    }

    const text =
      result.choices?.[0]?.message?.content ||
      result.choices?.[0]?.message?.reasoning ||
      "";

    const rawText = text.trim();
    const extractedJson = extractJsonObject(rawText);
    const parsed = parseJeeProblemBreakdownJson(extractedJson ?? rawText);

    if (!parsed.ok) {
      return NextResponse.json(
        {
          error: "AI response format validation failed.",
          details: parsed.error,
        },
        { status: 502 },
      );
    }

    return NextResponse.json(parsed.data, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json(
      {
        error: "Failed to analyze JEE problem.",
        details: message,
      },
      { status: 500 },
    );
  }
}

