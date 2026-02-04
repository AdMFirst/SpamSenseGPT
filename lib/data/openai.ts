import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE,
});

const systemPrompt = `From 0-100, rate the following message for possibility of being a spam message with 100 being spam, and 0 being safe. Respond with a JSON object containing:
- "probability": an integer between 0-100
- "reasoning": a string explaining your reasoning

You must only respond with valid JSON. Do not include any other text.`;

function scaffold(pesan: string): string {
    return `Please analyze this message for spam: "${pesan}"`;
}

interface GPTResponse {
    probability: number;
    reasoning: string;
}

export async function createResponse(isiPesan: string): Promise<GPTResponse> {
    if (!isiPesan || isiPesan.trim().length === 0) {
        throw new Error("Message cannot be empty");
    }

    const model = process.env.LLM_MODEL_USED || "meta-llama/llama-3.2-3b-instruct:free";

    try {
        const chatCompletion = await openai.chat.completions.create({
            model: model,
            messages: [
                {role: 'system', content: systemPrompt },
                {role: "user", content: scaffold(isiPesan) }
            ],
            temperature: 0.3,
            max_tokens: 500,
        });

        const content = chatCompletion.choices[0]?.message?.content;
        
        if (!content) {
            throw new Error("Empty response from AI service");
        }

        const cleanedContent = content.trim();
        
        // Try to extract JSON from the response
        let jsonMatch = cleanedContent.match(/\{.*\}/s);
        let jsonString = jsonMatch ? jsonMatch[0] : cleanedContent;
        
        const response = JSON.parse(jsonString) as GPTResponse;
        
        // Validate the response structure
        if (typeof response.probability !== 'number' ||
            typeof response.reasoning !== 'string' ||
            response.probability < 0 ||
            response.probability > 100) {
            throw new Error("Invalid response format from AI service");
        }
        
        return {
            probability: Math.round(response.probability),
            reasoning: response.reasoning
        };
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new Error("Failed to parse AI response: invalid JSON format");
        }
        throw error;
    }
}