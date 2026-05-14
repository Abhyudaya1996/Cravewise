import { NextResponse } from "next/server";
import {
  cravingInterpretationJsonSchema,
  validateCravingInterpretation,
} from "../../../data/cravingInterpretationValidation";
import type { InterpretationFallbackReason } from "../../../data/cravingInterpretationValidation";
import type { DecisionContext } from "../../../data/sampleData";

const defaultModel = "gpt-4.1-mini";
const timeoutMs = 5000;

type InterpretRequest = {
  context?: DecisionContext;
};

type OpenAIResponsePayload = {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
};

export async function POST(request: Request) {
  let body: InterpretRequest;
  try {
    body = await request.json();
  } catch {
    return fallback("invalid_schema");
  }

  const context = body.context;
  if (!context || typeof context.cravingText !== "string") {
    return fallback("missing_required_field");
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return fallback("missing_api_key");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || defaultModel,
        store: false,
        input: [
          {
            role: "system",
            content: [
              {
                type: "input_text",
                text: [
                  "You extract structured craving signals for CraveWise.",
                  "Return only taxonomy-valid JSON matching the schema.",
                  "Do not choose or mention final recommendations, item IDs, restaurants, scores, rankings, or backups.",
                  "Negative user boundaries such as not oily, not cheesy, light, and sleepy must go in negativeConstraints.",
                  "AI only extracts signals; deterministic local scoring chooses the final recommendation.",
                ].join(" "),
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: JSON.stringify({
                  rawCraving: context.cravingText,
                  decisionContext: context,
                  instruction: "Set rawInput exactly equal to rawCraving.",
                }),
              },
            ],
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "cravewise_craving_interpretation",
            strict: true,
            schema: cravingInterpretationJsonSchema,
          },
        },
      }),
    });

    if (!response.ok) {
      return fallback("api_error");
    }

    const payload = await response.json() as OpenAIResponsePayload;
    const outputText = extractOutputText(payload);
    if (!outputText) {
      return fallback("invalid_schema");
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(outputText);
    } catch {
      return fallback("invalid_schema");
    }

    const validation = validateCravingInterpretation(parsed, context.cravingText);
    if (!validation.valid) {
      return fallback(validation.reason);
    }

    return NextResponse.json({
      interpretationSource: "ai_interpreted",
      interpretation: validation.interpretation,
      model: process.env.OPENAI_MODEL || defaultModel,
    });
  } catch (error) {
    const reason: InterpretationFallbackReason = error instanceof DOMException && error.name === "AbortError"
      ? "timeout"
      : "api_error";
    return fallback(reason);
  } finally {
    clearTimeout(timeout);
  }
}

function fallback(reason: InterpretationFallbackReason) {
  return NextResponse.json({
    interpretationSource: "static_fallback",
    fallbackReason: reason,
  });
}

function extractOutputText(payload: OpenAIResponsePayload): string | null {
  if (typeof payload.output_text === "string") return payload.output_text;
  for (const output of payload.output ?? []) {
    for (const content of output.content ?? []) {
      if (content.type === "output_text" && typeof content.text === "string") return content.text;
    }
  }
  return null;
}
