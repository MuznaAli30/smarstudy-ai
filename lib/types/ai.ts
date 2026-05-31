export type AIRequestType = "explain" | "quiz" | "plan";

export interface AIRequestBody {
  type: AIRequestType;
  text: string;
}

export interface AIResponseBody {
  result: string;
}
