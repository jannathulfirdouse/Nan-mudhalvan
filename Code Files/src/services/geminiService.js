const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the GoogleGenAI client
const getClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_google_gemini_api_key_here') {
    throw new Error('Gemini API key is not configured. Please add GEMINI_API_KEY to your .env file.');
  }
  return new GoogleGenerativeAI(apiKey);
};

/**
 * Generates a concise answer for a user's question.
 * @param {string} question
 * @returns {Promise<string>}
 */
const generateAnswer = async (question) => {
  try {
    const ai = getClient();
    // சரியான மாடல் பெயர்: gemini-2.0-flash
    const model = ai.getGenerativeModel({ model: 'gemini-3.6-flash' });

    const prompt = `You are a helpful assistant. Provide a clear, concise, and direct answer to the following question:\n\nQuestion: ${question}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error('No response text received from Gemini API');
    }

    return text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
};
const generateFAQ = async (topic) => {
  const prompt = `Generate a FAQ pair with question and answer for the topic: ${topic}. Return JSON format with question and answer fields.`;
  return await generateAnswer(prompt);
};
module.exports = {
  generateAnswer,
  generateFAQ
};module.exports = {
  generateAnswer,
  generateFAQ
};