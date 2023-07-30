const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  basePath: process.env.OPENAI_API_BASE
});
const openai = new OpenAIApi(configuration);

function scaffold(pesan: string) {
    return {
        "command":"From 0-100, rate this message for possibilty of being a spam email with 100 is spam, and 0 is safe. Send your response with the provided schema",
        "message":pesan,
        "response_schema":{
            "probability":"int",
            "reasoning":"str",
        }
    }
}

export async function createResponse(isiPesan: string) {
    console.log((new Date()).toISOString()+" - called openai api")
    const pesan = JSON.stringify(scaffold(isiPesan));
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [{role: "user", content: pesan}],
    });

    const response = JSON.parse(chatCompletion.data.choices[0].message.content);

    return response
}