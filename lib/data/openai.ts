import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE,
  defaultHeaders: {
    "HTTP-Referer": 'https://spam-sense-gpt.vercel.app', // Optional, for including your app on openrouter.ai rankings.
  }
});

const systemPrompt = {
    "command" : 'From 0-100, rate the following message for possibilty of \
    being a spam message with 100 is spam, and 0 is safe. Send your response \
    with the provided schema. You must only answer using the provided json schema. \
    You cannot answer without following the response schema. Use the correct language \
    when responding',
    "response_schema":{ 
        "probability":"int", 
        "reasoning":"str", 
    },
    "language": "id" 
}




function scaffold(pesan: string) {
    return 'help scan this message "'+pesan+'"';
}


export async function createResponse(isiPesan: string) {
    console.log((new Date()).toISOString()+" - called openai api")

    const chatCompletion = await openai.chat.completions.create({
        model: process.env.LLM_MODEL_USED?? "meta-llama/llama-3.2-3b-instruct:free",
        messages: [
            {role: 'system', content: JSON.stringify(systemPrompt) },
            {role: "user", content: scaffold(isiPesan) }
        ],
    });

    console.log(chatCompletion.choices[0].message.content!)
    const response = JSON.parse(chatCompletion.choices[0].message.content!);

    return response
}