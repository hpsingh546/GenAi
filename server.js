import Groq from "groq-sdk";
import "dotenv/config";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
async function main() {
  const response = await groq.chat.completions.create({
    temperature: 1,
    //top_p:0.1,
    stop: "ga", //Negative
    max_completion_tokens,
    frequency_penalty: 1,
    // presence_penalty:
    messages: [
      {
        content:
          "you are sentimental analyzer your task is to give review and return sentiment . classify the review as positive,negative or neutral output must be single word",
        role: "system",
      }, //system persona
      {
        content: `this pc is good but not for intensive task less ram,less gpu power less rom
        Sentimet:`,
        role: "user",
      },
    ],
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
  });
  console.log(response.choices[0].message.content);
  console.log("By By");
}
main();
