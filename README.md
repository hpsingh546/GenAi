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
