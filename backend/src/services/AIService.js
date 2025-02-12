const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.google_key);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash",
    systemInstruction:`
        You are an code reviewer. You are reviewing a code submission of DSA logics. You need to provide feedback on the code review you give optimized code and different logics for the code and short ways. also fix error in code and complete code`
 });


async function generateContent(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = generateContent;