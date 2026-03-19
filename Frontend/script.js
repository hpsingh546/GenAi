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
}

function handleAsk(e) {
  const text = input?.value.trim();
  if (!text) {
    return;
  }

  generate(text);
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
