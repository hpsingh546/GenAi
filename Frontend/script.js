const input = document.getElementById("input");
const askBtn = document.getElementById("ask");

console.log(input);

input.addEventListener("keyup", handelEnter);
askBtn.addEventListener("click", handleAsk);

async function generate(text) {
  /**
   * 1. append message to ui
   * <div class="my-6 bg-neutral-800 p-3 rounded-3xl ml-auto max-w-fit">
Hi how are you?
</div>
   * 2. Send it to the LLM
   * 3. Append response to the ui
   */
  const msg = document.createElement("div");
  msg.className = `my-6 bg-neutral-800 p-3 rounded-xl ml-auto max-w-fit`;
  msg.textContent = text;
  chatContainer?.appendChild(msg);
  input.value = "";
  //call server
  const assistantMsg = await callServer(text);
  const assistantMsgEle = document.createElement("div");
  assistantMsgEle.className = `max-w-fit`;
  assistantMsgEle.textContent = assistantMsg;
  chatContainer?.appendChild(assistantMsgEle);
}
async function callServer(message) {
  console.log(message);
  const response = await fetch("http://localhost:3001/chat", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ message: message }),
  });
  if (!response.ok) throw new Error("error generating response");
  const result = await response.json();
  console.log(result);
  return result.message;
}
async function handleAsk(e) {
  const text = input?.value.trim();
  if (!text) {
    return;
  }

  await generate(text);
}

function handelEnter(e) {
  if (e.key == "Enter") {
    const text = input?.value.trim();
    console.log(text);
    if (!text) {
      return;
    }

    generate(text);
  }
}
