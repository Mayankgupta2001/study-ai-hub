import { NextResponse } from "next/server";
import { buildUpscExaminerPrompt } from "@/lib/prompts/upscAnswerCoach";
import {
  parseEvaluationJson,
  validateAnswerCoachRequest,
} from "@/lib/validators/answerCoach";

const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const modelName = "llama-3.3-70b-versatile";

type GroqChatCompletionResult = {
  error?: { message?: string };
  choices?: Array<{
    message?: { content?: string; reasoning?: string };
  }>;
};

export async function POST(request: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Missing GROQ_API_KEY on server." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const validated = validateAnswerCoachRequest(body);
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const prompt = buildUpscExaminerPrompt(validated.data);
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
          error: "Failed to evaluate answer.",
          details: apiErrorMessage,
        },
        { status: 502 },
      );
    }

    console.log(JSON.stringify(result));

    const text =
      result.choices?.[0]?.message?.content ||
      result.choices?.[0]?.message?.reasoning ||
      "";

    console.log("AnswerWritingCoach raw model text:", text);

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

    const rawText = text.trim();
    const extractedJson = extractJsonObject(rawText);
    if (extractedJson) {
      console.log("AnswerWritingCoach extracted JSON:", extractedJson);
    }

    const parsed = parseEvaluationJson(extractedJson ?? rawText);

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
    console.log("AnswerWritingCoach API error:", error);
    const message =
      error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json(
      {
        error: "Failed to evaluate answer.",
        details: message,
      },
      { status: 500 },
    );
  }
}
