import Groq from "groq-sdk";
import { z } from "zod";

import "dotenv/config";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
// 1. Define your expected structure with Zod
const SentimentSchema = z.object({
  sentiment: z.enum(["Positive", "Negative", "Neutral"]),
  confidence: z.number().min(0).max(10),
});
async function main(reviewText) {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          content: `you are sentimental analyzer your task is to give review and return sentiment . classify the review as positive,negative or neutral output must single object and in  JSON structure
          example:{"sentiment":"Negative","confidence":"6"}`,
          role: "system",
        }, //system persona
        {
          content: reviewText,
          role: "user",
        },
      ],
      response_format: { type: "json_object" },

      model: "meta-llama/llama-4-scout-17b-16e-instruct",
    });

    const rawJson = response.choices[0].message.content;
    if (!rawJson) throw new Error("Empty response");

    // 2. Parse the JSON string
    const parsed = JSON.parse(rawJson);
    console.log(parsed);
    // 3. Validate against Zod schema
    const validated = SentimentSchema.parse(parsed);

    console.log("✅ Validated data:", validated);
    return validated;
  } catch (error) {
    console.error("❌ Validation failed:", error.message);
    // Here you could implement retry logic or fallback
    return null;
  }
}
const text = `this pc is good`;
main(text);
