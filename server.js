import Groq from "groq-sdk";
import 'dotenv/config'
const groq = new Groq({ apiKey:process.env.GROQ_API_KEY});
async function main() {
    const response=await groq.chat.completions.create({
    messages: [
    { content: 'who are you', role: 'user'},
    { content: 'you are world best comedian create your name for yourself but not your model name, give humour in each answer and be polite and speak truth', role: 'system'}//system persona

],
    model: 'meta-llama/llama-4-scout-17b-16e-instruct',
    },
    )
    console.log(response.choices[0].message.content)
    console.log("By By")
}
main()