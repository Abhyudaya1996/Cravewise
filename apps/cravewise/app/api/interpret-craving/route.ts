import { NextResponse } from "next/server";
import {
  cravingInterpretationJsonSchema,
  validateCravingInterpretation,
} from "../../../data/cravingInterpretationValidation";
import type { InterpretationFallbackReason } from "../../../data/cravingInterpretationValidation";
import type { DecisionContext } from "../../../data/sampleData";

const defaultOpenAIModel = "gpt-4.1-mini";
const defaultGeminiModel = "gemini-2.5-flash";
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

type GeminiResponsePayload = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
};

type AIProvider = "openai" | "gemini";

type SafeRouteDiagnostics = {
  provider: AIProvider;
  apiKeyConfigured: boolean;
  model: string;
  fallbackReason?: InterpretationFallbackReason;
  durationMs: number;
  errorCategory?: string;
  httpStatus?: number;
  openAIErrorType?: string;
  openAIErrorCode?: string;
  providerErrorType?: string;
  providerErrorCode?: string;
};

export async function POST(request: Request) {
  const startedAt = Date.now();
  const provider = getProvider();
  const model = getModel(provider);
  let body: InterpretRequest;
  try {
    body = await request.json();
  } catch {
    return fallback("invalid_schema", startedAt, provider, model, false, { errorCategory: "invalid_request_json" });
  }

  const context = body.context;
  if (!context || typeof context.cravingText !== "string") {
    return fallback("missing_required_field", startedAt, provider, model, false, { errorCategory: "missing_context" });
  }

  const apiKey = getApiKey(provider);
  if (!apiKey) {
    return fallback("missing_api_key", startedAt, provider, model, false, { errorCategory: "missing_api_key" });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await requestProviderInterpretation({ provider, model, apiKey, context, signal: controller.signal });

    if (!response.ok) {
      const safeError = await parseSafeProviderError(response);
      return fallback("api_error", startedAt, provider, model, true, {
        errorCategory: `${provider}_http_error`,
        httpStatus: response.status,
        ...safeError,
      });
    }

    const payload = await response.json() as OpenAIResponsePayload | GeminiResponsePayload;
    const outputText = extractOutputText(provider, payload);
    if (!outputText) {
      return fallback("invalid_schema", startedAt, provider, model, true, { errorCategory: "missing_output_text" });
    }

    let parsed: unknown;
    try {
      parsed = parseStructuredOutputText(outputText);
    } catch {
      return fallback("invalid_schema", startedAt, provider, model, true, { errorCategory: "invalid_output_json" });
    }

    const validation = validateCravingInterpretation(parsed, context.cravingText);
    if (!validation.valid) {
      return fallback(validation.reason, startedAt, provider, model, true, { errorCategory: "validation_failed" });
    }

    return NextResponse.json({
      interpretationSource: "ai_interpreted",
      interpretation: validation.interpretation,
      provider,
      model,
      diagnostics: buildDiagnostics(startedAt, provider, model, true),
    });
  } catch (error) {
    const reason: InterpretationFallbackReason = error instanceof DOMException && error.name === "AbortError"
      ? "timeout"
      : "api_error";
    return fallback(reason, startedAt, provider, model, true, {
      errorCategory: reason === "timeout" ? "request_timeout" : "request_failed",
    });
  } finally {
    clearTimeout(timeout);
  }
}

function fallback(
  reason: InterpretationFallbackReason,
  startedAt: number,
  provider: AIProvider,
  model: string,
  apiKeyConfigured: boolean,
  diagnostics: Partial<SafeRouteDiagnostics> = {},
) {
  return NextResponse.json({
    interpretationSource: "static_fallback",
    fallbackReason: reason,
    diagnostics: buildDiagnostics(startedAt, provider, model, apiKeyConfigured, {
      ...diagnostics,
      fallbackReason: reason,
    }),
  });
}

function extractOutputText(provider: AIProvider, payload: OpenAIResponsePayload | GeminiResponsePayload): string | null {
  if (provider === "openai") {
    const openAIPayload = payload as OpenAIResponsePayload;
    if (typeof openAIPayload.output_text === "string") return openAIPayload.output_text;
    for (const output of openAIPayload.output ?? []) {
      for (const content of output.content ?? []) {
        if (content.type === "output_text" && typeof content.text === "string") return content.text;
      }
    }
    return null;
  }

  const geminiPayload = payload as GeminiResponsePayload;
  return geminiPayload.candidates?.[0]?.content?.parts
    ?.map((part) => part.text)
    .find((text): text is string => typeof text === "string" && text.trim().length > 0) ?? null;
}

function parseStructuredOutputText(outputText: string): unknown {
  const trimmed = outputText.trim();
  const fencedJsonMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  if (fencedJsonMatch) return JSON.parse(fencedJsonMatch[1]);
  try {
    return JSON.parse(trimmed);
  } catch (error) {
    const firstObject = trimmed.indexOf("{");
    const lastObject = trimmed.lastIndexOf("}");
    if (firstObject >= 0 && lastObject > firstObject) {
      return JSON.parse(trimmed.slice(firstObject, lastObject + 1));
    }
    throw error;
  }
}

function buildDiagnostics(
  startedAt: number,
  provider: AIProvider,
  model: string,
  apiKeyConfigured: boolean,
  diagnostics: Partial<SafeRouteDiagnostics> = {},
): SafeRouteDiagnostics {
  return {
    provider,
    apiKeyConfigured,
    model,
    durationMs: Date.now() - startedAt,
    ...diagnostics,
  };
}

async function parseSafeProviderError(response: Response): Promise<Partial<SafeRouteDiagnostics>> {
  try {
    const payload = await response.json() as {
      error?: {
        type?: unknown;
        code?: unknown;
      };
    };
    const errorType = typeof payload.error?.type === "string" ? payload.error.type : undefined;
    const errorCode = typeof payload.error?.code === "string" ? payload.error.code : undefined;
    return {
      openAIErrorType: errorType,
      openAIErrorCode: errorCode,
      providerErrorType: errorType,
      providerErrorCode: errorCode,
    };
  } catch {
    return {};
  }
}

function getProvider(): AIProvider {
  return process.env.AI_PROVIDER === "gemini" ? "gemini" : "openai";
}

function getModel(provider: AIProvider): string {
  return provider === "gemini"
    ? process.env.GEMINI_MODEL || defaultGeminiModel
    : process.env.OPENAI_MODEL || defaultOpenAIModel;
}

function getApiKey(provider: AIProvider): string | undefined {
  return provider === "gemini" ? process.env.GEMINI_API_KEY : process.env.OPENAI_API_KEY;
}

function requestProviderInterpretation({
  provider,
  model,
  apiKey,
  context,
  signal,
}: {
  provider: AIProvider;
  model: string;
  apiKey: string;
  context: DecisionContext;
  signal: AbortSignal;
}) {
  return provider === "gemini"
    ? requestGeminiInterpretation({ model, apiKey, context, signal })
    : requestOpenAIInterpretation({ model, apiKey, context, signal });
}

function requestOpenAIInterpretation({
  model,
  apiKey,
  context,
  signal,
}: {
  model: string;
  apiKey: string;
  context: DecisionContext;
  signal: AbortSignal;
}) {
  return fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    signal,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      store: false,
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: getSystemInstruction(),
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: getUserInstruction(context),
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
}

function requestGeminiInterpretation({
  model,
  apiKey,
  context,
  signal,
}: {
  model: string;
  apiKey: string;
  context: DecisionContext;
  signal: AbortSignal;
}) {
  return fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: "POST",
    signal,
    headers: {
      "x-goog-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: getSystemInstruction() }],
      },
      contents: [
        {
          role: "user",
          parts: [{ text: getUserInstruction(context) }],
        },
      ],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 600,
        responseMimeType: "application/json",
        responseJsonSchema: cravingInterpretationJsonSchema,
      },
    }),
  });
}

function getSystemInstruction(): string {
  return [
    "You extract structured craving signals for CraveWise.",
    "Return only taxonomy-valid JSON matching the schema.",
    "Do not choose or mention final recommendations, item IDs, restaurants, scores, rankings, or backups.",
    "Negative user boundaries such as not oily, not cheesy, light, and sleepy must go in negativeConstraints.",
    "AI only extracts signals; deterministic local scoring chooses the final recommendation.",
  ].join(" ");
}

function getUserInstruction(context: DecisionContext): string {
  return JSON.stringify({
    rawCraving: context.cravingText,
    decisionContext: context,
    instruction: "Set rawInput exactly equal to rawCraving.",
  });
}
