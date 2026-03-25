import { NextResponse } from "next/server";
import { buildUpscExaminerPrompt } from "@/lib/prompts/upscAnswerCoach";
import {
  parseEvaluationJson,
  validateAnswerCoachRequest,
} from "@/lib/validators/answerCoach";

const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const modelName = "nvidia/nemotron-3-super-120b-a12b:free";

type OpenRouterCompletionResult = {
  error?: { message?: string };
  choices?: Array<{
    message?: { content?: string; reasoning?: string };
  }>;
};

export async function POST(request: Request) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENROUTER_API_KEY on server." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const validated = validateAnswerCoachRequest(body);
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const prompt = buildUpscExaminerPrompt(validated.data);
    const completionResponse = await fetch(OPENROUTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: modelName,
        temperature: 0.2,
        max_tokens: 900,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: prompt.system },
          { role: "user", content: prompt.user },
        ],
      }),
    });

    const result = (await completionResponse.json()) as OpenRouterCompletionResult;

    if (!completionResponse.ok) {
      const apiErrorMessage =
        result?.error?.message ?? "OpenRouter request failed.";
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
    const rawText = text.trim();
    const parsed = parseEvaluationJson(rawText);

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
