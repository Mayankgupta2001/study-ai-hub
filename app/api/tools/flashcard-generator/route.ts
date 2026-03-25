import { NextResponse } from "next/server";
import { buildFlashcardGeneratorPrompt } from "@/lib/prompts/flashcardGenerator";
import {
  parseFlashcardGeneratorJson,
  validateFlashcardGeneratorRequest,
} from "@/lib/validators/flashcardGenerator";

const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const modelName = "llama-3.3-70b-versatile";

type GroqChatCompletionResult = {
  error?: { message?: string };
  choices?: Array<{
    message?: { content?: string; reasoning?: string };
  }>;
};

function extractJsonObject(raw: string): string | null {
  const withoutFences = raw.replace(
    /```(?:json)?\s*([\s\S]*?)\s*```/gi,
    "$1",
  );

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
    const validated = validateFlashcardGeneratorRequest(body);
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const prompt = buildFlashcardGeneratorPrompt(validated.data);

    const completionResponse = await fetch(GROQ_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: modelName,
        temperature: 0.2,
        max_tokens: 700,
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
          error: "Failed to generate flashcards.",
          details: apiErrorMessage,
        },
        { status: 502 },
      );
    }

    const text =
      result.choices?.[0]?.message?.content ||
      result.choices?.[0]?.message?.reasoning ||
      "";

    const extractedJson = extractJsonObject(text.trim());
    const parsed = parseFlashcardGeneratorJson(extractedJson ?? text);

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
        error: "Failed to generate flashcards.",
        details: message,
      },
      { status: 500 },
    );
  }
}

