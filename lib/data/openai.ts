const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  apiBase: process.env.OPENAI_API_BASE
});
const openai = new OpenAIApi(configuration);

function scaffold(pesan: string) {
    return {
        "command":"From 0-100, rate this message for possibilty of being a spam email with 100 is spam, and 0 is safe. Send your response with the provided schema and in selected language",
        "message":pesan,
        "ai_lang_setting":"id",
        "ai_response_schema":{
            "probability":"int",
            "reasosing":"str",
        }
    }
}

export async function createResponse(isiPesan: string) {
    const pesan = JSON.stringify(scaffold(isiPesan));
    const chatCompletion = await openai.createChatCompletion({
        model: "llama-2-7b-chat",
        messages: [{role: "user", content: pesan}],
      });
    console.log(chatCompletion.data.choices[0].message);
    const response = JSON.parse(chatCompletion.data.choices[0].message);
    console.log(response);
    response.metadata = chatCompletion;
    return response

}