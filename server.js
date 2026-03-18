import Groq from "groq-sdk";
import "dotenv/config";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
async function main() {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b", //some models have capability for browser search as welll like open ai
    temperature: 0,

    messages: [
      {
        content: `You are a smart personal assistant who ans the question. 
      When you need information you don't have, use the 'Websearch' tool. 
     `,
        role: "system",
      }, //system persona
      {
        content: `when iphone 17 is launched`,
        role: "user",
      },
    ],

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
  const toolCalls = response.choices[0].message.tool_calls;
  if (!toolCalls) //means llm not make toke tools it get ans
  {
    console.log(`Assistatant`, response.choices[0].message);
    return;
  }
  for (const tool of toolCalls) {
    const functionName = tool.function.name;
    const argumentsName = tool.function.arguments; //its in json string
    console.log(functionName);
    console.log(JSON.parse(argumentsName));
    if (functionName === "Websearch") {
      const ToolResult = await Websearch(JSON.parse(argumentsName));
      console.log(ToolResult);
    }
  }
}
async function Websearch({ query }) {
  console.log(query);
  console.log("calling websearch");
  return "query";
}
main();
