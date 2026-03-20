import Groq from "groq-sdk";
import "dotenv/config";
import { tavily } from "@tavily/core";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const tvly = tavily({ apiKey: process.env.TVLY_API_KEY });
let toolCallFreq = 0;
const messages = [
  {
    content: `You are a smart personal assistant who ans the question. 
      When you need information you don't have, use the 'Websearch({query})'//search the latest information and real time data on internet,
     `,
    role: "system",
  },
];
export async function generate(UserMessage) {
  messages.push({
    role: "user",
    content: UserMessage,
  });
  while (true) {
    const response = await groq.chat.completions.create({
      //Creates a model response for the given chat conversation.z
      model: "openai/gpt-oss-120b", //some models have capability for browser search as welll like open ai
      temperature: 0,

      messages: messages,

      tools: [
        {
          type: "function",
          function: {
            name: "Websearch",
            description:
              "search the latest information and real time data on internet",
            parameters: {
              // JSON Schema object
              type: "object",
              properties: {
                query: {
                  type: "string",
                  description: "The search query to perform search on",
                },
              },
              required: ["query"], //we need to mention which param is required to call this function
            },
          },
        },
      ],
      tool_choice: "auto", //llm take decision
    });
    messages.push(response.choices[0].message); //we push assistant message to message so next time it is present in message history
    const toolCalls = response.choices[0].message.tool_calls;
    if (!toolCalls) //means llm not make toke tools it get ans
    {
      console.log(`Assistatant`, response.choices[0].message.content);
      return response.choices[0].message.content;
    }
    toolCallFreq += 1;
    console.log("tool Call Freq=>", toolCallFreq);
    for (const tool of toolCalls) {
      const functionName = tool.function.name;
      const argumentsName = tool.function.arguments; //its in json string

      if (functionName === "Websearch") {
        const ToolResult = await Websearch(JSON.parse(argumentsName));
        messages.push({
          tool_call_id: tool.id,
          role: "tool",
          name: functionName,
          content: ToolResult,
        });
      }
    }
  } //this loop is for llm  tool calling
}
async function Websearch({ query }) {
  console.log(query);
  console.log("calling websearch");
  const response = await tvly.search(query);
  const result = response.results.map((obj) => {
    return obj.content;
  });
  const finalResult = result.join("\n");
  return finalResult;
}
