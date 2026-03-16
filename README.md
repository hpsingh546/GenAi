CHAPTER 3: Working with LLMs

part 4. LLM settings

llm configure=>
if we want toget effective result from llm than we can configure llm using some other parameter
/\*
1.temperature=>higher value make output random sometime it can generate giberish as well lower make it more focused temparature is between 0 to 2 can be found using trial erro
2.top_p=>llm predict like pattern model considers the results of the tokens with top_p probability mass. So 0.1

- means only the tokens comprising the top 10% probability mass are considered.
  3.stop=we can give some string input as when this string come in output it will stop

  4.max_completion_tokens=>if we want to limit the output token use case in pricing work in openai

  5.frequency_penalty=llm jo hai woh bohot sare word repeat karta agar aap chahte repetion word ka occurence kam hojaye then we use this
  6.presence penality=laghbag same as frequency penality
  we can either use temperature or top_p not both at same time
  \*/

part 5:

/\*
structured output
if we want structure data(JSON data) from LLM we can do in this way

first way
we can through prompt instruction

1.  {
    content: `you are sentimental analyzer your task is to give review and return sentiment . classify the review as positive,negative or neutral output must single word and in  JSON structure
  example:{"sentiment":"Negative"}`,
    role: "system",
    },
2.  second way

https://console.groq.com/docs/structured-outputs#json-object-mode
https://console.groq.com/docs/structured-outputs
Requirements and limitations:

Include explicit JSON instructions in your prompt (system message or user input)
Outputs are syntactically valid JSON but may not match your intended schema
Combine with validation libraries and retry logic for schema compliance

Enable JSON Object Mode by setting response_format to { "type": "json_object" }.

3. third way schema validation
   import Groq from "groq-sdk";
   import { z } from "zod";
   import { zodToJsonSchema } from "zod-to-json-schema"; // Often required for clean schema conversion

const groq = new Groq();

// Define the schema (same as before)
const supportTicketSchema = z.object({
category: z.enum(["api", "billing", "account", "bug", "feature_request", "integration", "security", "performance"]),
priority: z.enum(["low", "medium", "high", "critical"]),
urgency_score: z.number(),
customer_info: z.object({
name: z.string(),
company: z.string().optional(),
tier: z.enum(["free", "paid", "enterprise", "trial"])
}),
technical_details: z.array(z.object({
component: z.string(),
error_code: z.string().optional(),
description: z.string()
})),
keywords: z.array(z.string()),
requires_escalation: z.boolean(),
estimated_resolution_hours: z.number(),
follow_up_date: z.string().datetime().optional(),
summary: z.string()
});

async function classifyTicket() {
const response = await groq.chat.completions.create({
model: "moonshotai/kimi-k2-instruct-0905",
messages: [
{
role: "system",
content: `You are a customer support ticket classifier for SaaS companies.
Analyze support tickets and categorize them for efficient routing and resolution.
Output JSON only using the schema provided.`,
},
{
role: "user",
content: `Hello! I love your product and have been using it for 6 months.
I was wondering if you could add a dark mode feature to the dashboard?
Many of our team members work late hours and would really appreciate this.
Also, it would be great to have keyboard shortcuts for common actions.
Not urgent, but would be a nice enhancement!
Best, Mike from StartupXYZ`
},
],
response_format: {
type: "json_schema",
json_schema: {
name: "support_ticket_classification",
// Convert Zod schema to JSON schema
schema: zodToJsonSchema(supportTicketSchema)
}
}
});

const rawResult = JSON.parse(response.choices[0].message.content || "{}");

// Validate the data
const result = supportTicketSchema.parse(rawResult);
console.log(result);
}

classifyTicket();

\*/
