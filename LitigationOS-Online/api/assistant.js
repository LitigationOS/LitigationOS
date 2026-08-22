const OpenAI = require("openai");

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const legalSafetyInstructions = `You are LitigationOS, an AI assistant for legal professionals and individuals.
Give useful, clearly structured legal information and drafting support, but do not present yourself as a lawyer or give definitive legal advice. State that a qualified lawyer should review important decisions. Never invent statutes, cases, citations, quotations, court decisions, or links. If you cannot verify an authority from reliable supplied material, say so plainly and suggest where to verify it. Ask concise follow-up questions when jurisdiction, key facts, dates, or documents are missing. Keep the answer professional and readable.`;

module.exports = async (request, response) => {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Use POST for this endpoint." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return response.status(500).json({ error: "The AI service has not been configured yet. Add OPENAI_API_KEY in Vercel Environment Variables and redeploy." });
  }

  const message = typeof request.body?.message === "string" ? request.body.message.trim() : "";
  const mode = request.body?.mode === "research" ? "research" : "assistant";
  if (!message || message.length > 12000) {
    return response.status(400).json({ error: "Please enter a question of up to 12,000 characters." });
  }

  const task = mode === "research"
    ? `Prepare a research-oriented response to this question: ${message}\n\nUse headings: Issue, Information needed, Research plan, Preliminary analysis, and Verification note.`
    : message;

  try {
    const completion = await client.responses.create({
      model: "gpt-5.6",
      instructions: legalSafetyInstructions,
      input: task,
      store: false
    });
    return response.status(200).json({ text: completion.output_text || "I could not produce a response. Please try again." });
  } catch (error) {
    console.error("LitigationOS API error:", error);
    return response.status(error.status || 500).json({
      error: "LitigationOS could not reach the AI service. Please try again, or check your Vercel environment variable and API billing."
    });
  }
};
